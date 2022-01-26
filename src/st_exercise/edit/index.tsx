import EditComponent from "../../EditComponent";
import { renderFromPHP } from "../render";
import "./index.css";

const Edit =  () => <EditComponent separator={"\u22A8"}/>;

renderFromPHP(Edit);