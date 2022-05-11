import LineNumberWrapper from "../../components/LineNumberWrapper";
import useFCSolution from "../../stores/fc";

const LineNumber = ({id}: {id: string}) => {

    const lineNumber = useFCSolution(state => state.ids.indexOf(id));

    return <LineNumberWrapper number={lineNumber}/>
}

export default LineNumber;