import React, { ReactElement, useMemo } from "react";
import { Screen } from "components/common/Screen";
import { Config, ViewportContainer } from "components/Step5/ViewportContainer";
import { SCREEN_COLORS } from "components/Step1";

export const Step5 = (): ReactElement | null => {
  const config = useMemo<Config>((): Config => {
    if (typeof window !== "undefined") {
      return [
        {
          maxY: innerHeight * 2,
          type: "scroll",
        },
        {
          maxY: innerHeight * 2.5,
          type: "freeze",
        },
        {
          maxY: innerHeight * 3.5,
          type: "scroll",
        },
        {
          maxY: innerHeight * 4,
          type: "freeze",
        },
        {
          maxY: innerHeight * 6,
          type: "scroll",
        },
        {
          maxY: innerHeight * 6.5,
          type: "freeze",
        },
      ];
    }
    return [];
  }, []);

  return (
    <ViewportContainer config={config}>
      {SCREEN_COLORS.map((color) => (
        <Screen key={color} color={color} />
      ))}
    </ViewportContainer>
  );
};
