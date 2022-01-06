import { Path } from "@hookstate/core";

export const pathToPHPFormName = (path: Path): string => path.reduce<string>((agg, cur) => agg + "[" + cur + "]", "lines");