import Formula from "../components/Formula";
import useStatements from "../stores/statements";


const Statement = ({id}: {id: string}) => {

    const value = useStatements(state => state.entries[id]);

    const set = useStatements(state => state.set);

    return <Formula allowPred name={`statements[entries][${id}]`} value={value} setValue={(value) => set(id, value)}/>
}

export default Statement;