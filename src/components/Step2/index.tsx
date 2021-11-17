import React, { ReactElement } from "react";
import { Screen } from "components/common/Screen";
import { SCREEN_COLORS } from "components/Step1";
import { ViewportContainer } from "components/Step2/ViewportContainer";

export const Step2 = (): ReactElement => {
  return (
    <ViewportContainer>
      {SCREEN_COLORS.map((color) => (
        <Screen key={color} color={color} />
      ))}
    </ViewportContainer>
  );
};
