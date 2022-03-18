import Line from "./Line";
import { useTypedSelector } from "./redux";

const Lines = () => {

    const lineIds = useTypedSelector(state => state.solution.present.ids);

    return <div>
        {lineIds.map((id) => <div key={id}>
            <Line id={id}/>
        </div>)}
    </div>

}

export default Lines;