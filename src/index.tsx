import {render} from "react-dom";
import { lazy, Suspense } from "react";
import "./index.css";
 
const element = document.getElementById("exercise-container");

const {props: propsString, view, exerciseType } = element?.dataset!;

const props = JSON.parse(propsString!);

const Component = lazy(() => import(/* webpackMode: 'lazy-once' */`./components/${exerciseType}/${view}`));

render(<Suspense fallback={<div>Loading</div>}><Component {...props}/></Suspense>, element);