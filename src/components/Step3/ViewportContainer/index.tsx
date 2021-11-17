import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
} from "react";

import styles from "./ViewportContainer.module.scss";

export const ViewportContainer = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Linearly changing transform value on every scroll event
  const handleScroll = (): void => {
    const y = window.scrollY;
    if (contentRef.current) {
      contentRef.current.style.transform = `translateY(-${y}px)`;
    }
  };

  // Setting height that equals content height to scroller container
  useEffect(() => {
    if (contentRef.current && scrollerRef.current) {
      const height = contentRef.current.getBoundingClientRect().height;
      scrollerRef.current.style.height = `${height}px`;
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
