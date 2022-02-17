import { createGlobalStyle } from "styled-components";

import { localFonts } from "./fonts";
import { normalize } from "./normalize";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  ${localFonts};
  ${normalize};

  :root {
    box-sizing: border-box;
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  body {
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.light};
    line-height: ${theme.lineHeights.body};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.bold};
    line-height: ${theme.lineHeights.heading};
  }
`;
