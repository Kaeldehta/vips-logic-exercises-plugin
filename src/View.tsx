import React from "react";
import { Task, ViewType } from "./types";
import { getTask, getView } from "./utils";

const modules = import.meta.glob("./**/View.tsx");

const views = Object.fromEntries(Object.entries(modules).map((value) => {
    const newKey = value[0].split("/").slice(1, -1).join("/")
    return [newKey, value[1]]
}))

console.log(views)

const view = getView();

const type = view === "edit" ? undefined : getTask<Task>()?.type;

const key = [view, type].filter((value) => value).join("/");

const viewImport = views[key] as () => Promise<{default: ViewType}>

const View = React.lazy(viewImport);

export default View;