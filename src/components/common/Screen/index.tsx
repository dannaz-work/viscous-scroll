import React, { ReactElement } from "react";

import styles from "components/common/Screen/Screen.module.scss";

export const Screen = ({ color }: { color: string }): ReactElement => (
  <div className={styles.root} style={{ backgroundColor: color }}>
    <span>{color}</span>
  </div>
);
