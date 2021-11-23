import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
} from "react";

import styles from "components/Step4/ViewportContainer/ViewportContainer.module.scss";

export type PageState = {
  type: "scroll" | "freeze";
  maxY: number;
};

export type Config = Array<PageState>;

const INITIAL_STATE: PageState = { maxY: 0, type: "scroll" };
const FINAL_STATE: PageState = { maxY: Infinity, type: "scroll" };

export type ViewportContainerProps = {
  config: Config;
};

export const ViewportContainer = ({
  config,
  children,
}: PropsWithChildren<ViewportContainerProps>): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  let currentStateIndex = 0;
  let currentState = config[currentStateIndex];
  let currentY = 0;
  let currentFreezeHeight = 0;

  const totalFreezeHeight = useMemo(() => {
    let _totalFreezeHeight = 0;
    config.forEach((state, index) => {
      if (state.type === "freeze") {
        const prevY = index > 0 ? config[index - 1].maxY : 0;
        _totalFreezeHeight += state.maxY - prevY;
      }
    });
    return _totalFreezeHeight;
  }, [config]);

  const getCurrentY = (scrollPosition: number): number => {
    if (scrollPosition <= currentState.maxY && currentState.type === "scroll") {
      return scrollPosition;
    }
    return currentY;
  };

  // Return current page state, depends on scrollPosition Y
  const getCurrentPageState = (scrollPosition: number): PageState => {
    const prevState = config[currentStateIndex - 1] || INITIAL_STATE;
    const nextState = config[currentStateIndex + 1] || FINAL_STATE;

    if (scrollPosition <= prevState.maxY) {
      currentStateIndex -= 1;
      if (currentState.type === "freeze") {
        currentFreezeHeight = getCurrentFreezeHeight();
      }
      return prevState;
    }
    if (scrollPosition <= currentState.maxY) {
      return currentState;
    }
    currentStateIndex += 1;

    if (currentState.type === "freeze") {
      currentFreezeHeight = getCurrentFreezeHeight();
    }

    return nextState;
  };

  // Return current freeze height, depend on state index
  const getCurrentFreezeHeight = (): number => {
    let updatedFreezeHeight = 0;
    for (let i = 0; i <= currentStateIndex; i++) {
      if (config[i] && config[i].type === "freeze") {
        const prevState = config[i - 1];
        updatedFreezeHeight +=
          config[i].maxY - (prevState ? prevState.maxY : 0);
      }
    }
    return updatedFreezeHeight;
  };

  // Linearly changing transform value on every scroll event
  const handleScroll = (): void => {
    const y = window.scrollY;
    if (contentRef.current) {
      currentState = getCurrentPageState(y);
      currentY = getCurrentY(y);

      contentRef.current.style.transform = `translateY(-${
        currentY - currentFreezeHeight
      }px)`;
    }
  };

  // Setting height that equals content height to scroller container
  useEffect(() => {
    if (contentRef.current && scrollerRef.current) {
      const height = contentRef.current.getBoundingClientRect().height;
      scrollerRef.current.style.height = `${height + totalFreezeHeight}px`;
    }
  }, [contentRef, scrollerRef]);

  // Adding 'scroll' event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollerRef]);

  return (
    <div className={styles.root}>
      <div className={styles.viewer}>
        <div className={styles.container} ref={contentRef}>
          {children}
        </div>
      </div>
      <div className={styles.scroller} ref={scrollerRef} />
    </div>
  );
};
