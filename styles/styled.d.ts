import "styled-components";
import * as CSS from "csstype";

type StandardCSSProperties = CSS.Properties<number | string>;
type Empty = undefined | null | false;
type TLengthStyledSystem = string | 0 | number;
type ResponsiveStyleValue<T> = T | Empty | Array<T | Empty>;

interface CSSProperties
  extends CSS.StandardProperties<number | string>,
    CSS.SvgProperties<number | string>,
    CSS.VendorProperties<number | string> {}

interface ScaleDict<T> {
  [K: string]: T | T[] | NestedScaleDict<T> | undefined;
  [I: number]: T;
}

interface ObjectWithDefault<T> {
  __default?: T;
}

interface NestedScaleDict<T> extends ScaleDict<T>, ObjectWithDefault<T> {}

type Scale<T> = T[] | ScaleDict<T>;

type NestedScale<T> = T[] | NestedScaleDict<T>;

type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";
type CommonColors = "transparent" | "black" | "white";
type ExtendedColors =
  | CommonColors
  | "blue"
  | "cyan"
  | "fuschia"
  | "gray"
  | "green"
  | "indigo"
  | "lime"
  | "orange"
  | "pink"
  | "red"
  | "teal"
  | "violet"
  | "yellow";

type FontFamilies = "heading" | "body" | "monospace";
type FontWeights = "light" | "regular" | "medium" | "bold";
type LineHeights = "body" | "heading";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      [name in Breakpoints]: string;
    };
    colors: Record<ExtendedColors, string>;
    fonts: Record<FontFamilies, CSS.Property.FontFamily>;
    fontSizes: Scale<CSS.Property.FontSize<number>>;
    fontWeights: Record<FontWeights, CSS.Property.FontWeight>;
    lineHeights: Record<
      LineHeights,
      CSS.Property.LineHeight<TLengthStyledSystem>
    >;
    radii: Scale<CSS.Property.BorderRadius<TLengthStyledSystem>>;
    sizes: Scale<CSS.Property.Height<{}> | CSS.Property.Width<{}>>;
    space: Scale<CSS.Property.Margin<number | string>>;
    zIndices: Scale<CSS.Property.ZIndex>;
  }
}
