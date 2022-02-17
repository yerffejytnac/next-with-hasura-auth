export interface ThemeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export const defaultBreakpoints = [
  "0px",
  "576px",
  "768px",
  "992px",
  "1200px",
] as const;

export const getBreakpoints = (): string[] & ThemeBreakpoints => {
  const breakpoints = [...defaultBreakpoints] as string[] & ThemeBreakpoints;
  /* eslint-disable prefer-destructuring */
  breakpoints.xs = breakpoints[0];
  breakpoints.sm = breakpoints[1];
  breakpoints.md = breakpoints[2];
  breakpoints.lg = breakpoints[3];
  breakpoints.xl = breakpoints[4];

  return breakpoints;
};
