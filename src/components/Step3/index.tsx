import React, { ReactElement } from "react";
import { Screen } from "components/common/Screen";
import { SCREEN_COLORS } from "components/Step1";
import { ViewportContainer } from "components/Step3/ViewportContainer";

export const Step3 = (): ReactElement => {
  return (
    <ViewportContainer>
      {SCREEN_COLORS.map((color) => (
        <Screen key={color} color={color} />
      ))}
    </ViewportContainer>
  );
};
