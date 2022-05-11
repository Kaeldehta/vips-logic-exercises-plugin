import useFCSolution from "../../stores/fc";
import Line from "./Line";

const Lines = () => {

    const lineIds = useFCSolution(state => state.ids);

    return <div>
        {lineIds.map((id, index) => <div key={id}>
            <input type="hidden" name={`ids[${index}]`} value={id}/>
            <Line id={id}/>
        </div>)}
    </div>

}

export default Lines;