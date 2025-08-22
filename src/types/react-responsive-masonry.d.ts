// types/react-responsive-masonry.d.ts
declare module "react-responsive-masonry" {
  import * as React from "react";

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: { [key: number]: number };
    gutterBreakpoints?: { [key: number]: string };
    children?: React.ReactNode;
  }

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    children?: React.ReactNode;
  }

  export const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>;
  const Masonry: React.FC<MasonryProps>;

  export default Masonry;
}
