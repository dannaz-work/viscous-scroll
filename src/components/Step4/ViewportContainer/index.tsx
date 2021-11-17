import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
} from "react";

import styles from "./ViewportContainer.module.scss";

type PageState = {
  type: "scroll" | "freeze";
  maxY: number;
};

type Config = Array<PageState>;

const viewportMovingConfig: Config = [
  { maxY: 500, type: "scroll" },
  { maxY: 1500, type: "freeze" },
];

const INITIAL_STATE: PageState = { maxY: 0, type: "scroll" };
const FINAL_STATE: PageState = { maxY: Infinity, type: "scroll" };

export const ViewportContainer = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  let currentStateIndex = 0;
  let currentState = viewportMovingConfig[currentStateIndex];
  let currentY = 0;
  let currentFreezeHeight;

  const totalFreezeHeight = useMemo(() => {
    let _totalFreezeHeight = 0;
    viewportMovingConfig.forEach((state, index) => {
      if (state.type === "freeze") {
        const prevY = index > 0 ? viewportMovingConfig[index - 1].maxY : 0;
        _totalFreezeHeight += state.maxY - prevY;
      }
    });
    return _totalFreezeHeight;
  }, [viewportMovingConfig]);

  const getCurrentY = (scrollPosition: number): number => {
    if (scrollPosition <= currentState.maxY && currentState.type === "scroll") {
      return scrollPosition;
    }
    return currentY;
  };

  const getCurrentPageState = (scrollPosition: number): PageState => {
    const prevState =
      viewportMovingConfig[currentStateIndex - 1] || INITIAL_STATE;
    const nextState =
      viewportMovingConfig[currentStateIndex + 1] || FINAL_STATE;

    if (scrollPosition <= prevState.maxY) {
      currentStateIndex -= 1;
      return prevState;
    }
    if (scrollPosition <= currentState.maxY) {
      return currentState;
    }
    currentStateIndex += 1;
    return nextState;
  };

  const getCurrentFreezeHeight = (): number => {
    let _totalFreezeHeight = 0;
    for (let i = 0; i <= currentStateIndex; i++) {
      if (
        viewportMovingConfig[i] &&
        viewportMovingConfig[i].type === "freeze"
      ) {
        const prevState = viewportMovingConfig[i - 1];
        _totalFreezeHeight +=
          viewportMovingConfig[i].maxY - (prevState ? prevState.maxY : 0);
      }
    }
    return _totalFreezeHeight;
  };

  // Linearly changing transform value on every scroll event
  const handleScroll = (): void => {
    const y = window.scrollY;
    if (contentRef.current) {
      currentState = getCurrentPageState(y);
      currentFreezeHeight = getCurrentFreezeHeight();
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
