import * as ReactDOM from "react-dom";
import * as React from "react";
import { Suspense } from "react";
 
const element = document.getElementById("exercise-container");

const {props: propsString, view, exerciseType } = element?.dataset!;

const props = JSON.parse(propsString!);

const Component = React.lazy(() => import(/* webpackMode: "lazy-once" */`./components/${exerciseType}/${view}`));

ReactDOM.render(<Suspense fallback={<div>Loading</div>}><Component {...props}/></Suspense>, element);