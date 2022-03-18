import Conclusion from "./Conclusion";
import Statements from "./Statements";
import Submit from "./Submit";

const Edit = () => <div>
        <div className="flex flex-row items-center gap-1">
        <Submit/>
        <Statements/>
        {"TODO"}
        <Conclusion/>
        </div>
    </div>

export default Edit;
export {default as store} from "./redux";