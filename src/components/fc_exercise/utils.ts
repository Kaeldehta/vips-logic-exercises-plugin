import { isSubproof, Subproof } from "./domain";

export const getSubProofLineCount = (subproof: Subproof): number => subproof.lines.reduce((prev, cur) => isSubproof(cur) ? prev + getSubProofLineCount(cur) : prev + 1, 1)