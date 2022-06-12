import FormulaWrapped from "../Formula"
import IconButton from "../IconButton"
import Inserter from "./Inserter"

interface SemanticTreeNodeProps {
    prefix?: string
    index: number,
    remove: UseFieldArrayRemove
}


const SemanticTreeLine = ({ prefix = "", index, remove }: SemanticTreeNodeProps) => {

    const { register, watch, getValues, setValue, reset } = useFormContext();

    const type = watch(`${prefix}lines.${index}.type`);

    const number = watch(`${prefix}lines.${index}.number`)

    // const children = watch(`tree.${index}.children`);

    return <div className="group h-16 group flex justify-start gap-2 items-center">
        <span>{number}</span>
        {type !== "abs" ? <FormulaWrapped name={`${prefix}lines.${index}.formula`} /> : "abs"}
        <span className="w-20">{type === "ass" ? "Ass" : ""}</span>
        {/* <LineNumber solutionSelector={state => state.solution.present} id={id}/> */}
        {/* <Formula id={id}/> */}
        {/* <LabelOrNull solutionSelector={state => state.solution.present} id={id}/> */}

        {/* <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions} /> */}

        {/* <From solutionSelector={state => state.solution.present} id={id} fromRender={FromSelect}/> */}
        {/* <div className="ml-auto">
                <RemoveButton id={id} />
            </div> */}
        <span className="w-12"><IconButton onClick={() => {
            const lines = getValues(`${prefix}lines`);
            const parent = prefix.split(".").slice(0, -2).join(".")

            if (lines.length == 1) {
                if (parent !== "") {
                    setValue(parent, undefined)
                } else {
                    setValue("lines", [])
                    setValue("branch", undefined)
                }
            } else {
                remove(index)
            }

        }}><FiMinusCircle /></IconButton></span>

    </div>

}

export default SemanticTreeLine;