import { TreeSolution } from "../types/tree";


export const findParent = (id: string, solution: TreeSolution) => solution.ids.find(
    (parentId) => solution.lines[parentId].children[0] === id || solution.lines[parentId].children[1] === id
);