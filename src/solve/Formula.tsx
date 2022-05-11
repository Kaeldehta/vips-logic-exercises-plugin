import Formula from "../components/Formula";

const FormulaOrAbs = ({id}: {id: string}) => {

    const value = /*TODO*/ ""

    if(value === undefined) return <div className="w-56 h-12 pl-2 flex items-center justify-start">{"\u22A5"}</div>

    return <Formula value={value} setValue={() => {}}/>
}

export default FormulaOrAbs;