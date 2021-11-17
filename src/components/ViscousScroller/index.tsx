import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
} from "react";

import styles from "components/ViscousScroller/ViscousScroller.module.scss";

type Mode = "scroll" | "freeze";

type ConfigPoint = {
  toY: number;
  mode: Mode;
};

export type Config = Array<ConfigPoint>;

export type ViscousScrollerProps = PropsWithChildren<{ scrollConfig: Config }>;

export const ViscousScroller = ({
  children,
  scrollConfig,
}: ViscousScrollerProps): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  let currentStep: { index: number; point: ConfigPoint } = {
    index: 0,
    point: scrollConfig[0],
  };
  let currentFreezeHeight = 0;

  const totalFreezeHeight = useMemo(() => {
    let _totalFreezeHeight = 0;
    scrollConfig.forEach((point, index) => {
      if (point.mode === "freeze") {
        const prevY = index > 0 ? scrollConfig[index - 1].toY : 0;
        _totalFreezeHeight += point.toY - prevY;
      }
    });
    return _totalFreezeHeight;
  }, [scrollConfig]);

  const updateCurrentStep = (scrollPosition: number) => {
    if (
      scrollPosition >= currentStep.point.toY &&
      scrollConfig[currentStep.index + 1]
    ) {
      currentStep = {
        index: currentStep.index + 1,
        point: scrollConfig[currentStep.index + 1],
      };
      updateCurrentFreezeHeight();
    }
    if (
      currentStep.index > 0 &&
      scrollPosition < scrollConfig[currentStep.index - 1].toY
    ) {
      currentStep = {
        index: currentStep.index - 1,
        point: scrollConfig[currentStep.index - 1],
      };
      updateCurrentFreezeHeight();
    }
  };

  const updateCurrentFreezeHeight = (): void => {
    let _currentFreezeHeight = 0;
    for (let i = 0; i < currentStep.index; i++) {
      if (scrollConfig[i].mode === "freeze") {
        _currentFreezeHeight +=
          i === 0
            ? scrollConfig[i].toY
            : scrollConfig[i].toY - scrollConfig[i - 1].toY;
      }
    }
    currentFreezeHeight = _currentFreezeHeight;
  };

  const handleScroll = (): void => {
    const y = window.scrollY;
    if (contentRef.current) {
      if (currentStep.point.mode === "scroll") {
        contentRef.current.style.transform = `translateY(-${
          y - currentFreezeHeight
        }px)`;
      }
      updateCurrentStep(y);
    }
  };

  console.log(scrollConfig);

  useEffect(() => {
    if (contentRef.current && scrollerRef.current) {
      const height = contentRef.current.getBoundingClientRect().height;
      scrollerRef.current.style.height = `${height + totalFreezeHeight}px`;
    }
  }, [contentRef, scrollerRef]);

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
      <div className={styles.scroller} ref={scrollerRef}></div>
    </div>
  );
};
