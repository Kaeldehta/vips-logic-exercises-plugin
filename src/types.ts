import { ComponentType } from "react";

export interface Task {
    type: "fc" | "tree"
}

export type ViewType = ComponentType<{}>;