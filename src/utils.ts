import { Path } from "@hookstate/core";

export const pathToPHPFormName = (path: Path): string => path.slice(1).reduce<string>((agg, cur) => agg + "[" + cur + "]", path[0] as string);