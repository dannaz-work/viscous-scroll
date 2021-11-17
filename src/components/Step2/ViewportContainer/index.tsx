import React, { PropsWithChildren, ReactElement } from "react";

import styles from "./ViewportContainer.module.scss";

export const ViewportContainer = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => {
  return (
    <div className={styles.root}>
      <div className={styles.viewer}>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};
