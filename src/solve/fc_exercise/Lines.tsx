import { useTypedSelector } from "../../hooks";
import Line from "./Line";

const Lines = () => {

    const lineIds = useTypedSelector(state => state.response.present.ids);

    return <div>
        {lineIds.map((id) => <div key={id}>
            <Line id={id}/>
        </div>)}
    </div>

}

export default Lines;