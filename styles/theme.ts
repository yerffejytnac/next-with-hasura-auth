import { DefaultTheme } from "styled-components";

import { getBreakpoints } from "./breakpoints";
import colors from "./colors";
import { monoFonts, systemFonts } from "./fonts";

export const theme: DefaultTheme = {
  breakpoints: getBreakpoints(),
  colors,
  fonts: {
    body: `${systemFonts}`,
    heading: `Moderat, ${systemFonts}`,
    monospace: `${monoFonts}`,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    body: "calc(1em + 0.5rem)",
    heading: 1.125,
  },
  radii: ["4px", "6px", "8px", "12px", "50%", "9999px"],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  zIndices: [100, 200, 300, 400, 999],
};
