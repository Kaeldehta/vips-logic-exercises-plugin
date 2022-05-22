import { useAtomValue } from "jotai";
import { idsAtom } from "../atoms/fc";
import Line from "./Line";


const Lines = () => {

    const ids = useAtomValue(idsAtom);

    return <div>
        {ids.map((id) => <Line id={id} key={id} />)}
    </div>

}

export default Lines;