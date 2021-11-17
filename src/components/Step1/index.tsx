import React, { ReactElement } from "react";
import { Screen } from "components/common/Screen";

export const SCREEN_COLORS = [
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#FF0000",
];

export const Step1 = (): ReactElement => {
  return (
    <>
      {SCREEN_COLORS.map((color) => (
        <Screen key={color} color={color} />
      ))}
    </>
  );
};
