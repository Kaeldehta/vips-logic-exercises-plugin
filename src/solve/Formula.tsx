import { useAtom, WritableAtom } from "jotai";
import Formula from "../components/Formula";

interface FormulaProps {
    formulaAtom: WritableAtom<string | undefined, string>
}

const FormulaOrAbs = ({formulaAtom}: FormulaProps) => {

    const [formula, setFormula] = useAtom(formulaAtom);

    if(!formula) return <div className="w-56 h-12 pl-2 flex items-center justify-start">{"\u22A5"}</div>

    return <Formula value={formula} setValue={(newValue) => setFormula(newValue)}/>
}

export default FormulaOrAbs;