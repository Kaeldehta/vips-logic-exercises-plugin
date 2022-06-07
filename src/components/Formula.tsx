import { Controller } from "react-hook-form";
import { renderFormulaAsHTML, TASK, VIEW } from "../utils";

const propositionalLogicChars = /^[pqr12345789iklno\(\)]$/

const predicateLogicChars = /^[abcFGHxyzue=]$/;

interface FormulaProps {
  value: string | undefined
  setValue: (newValue: string) => void
  allowPred?: boolean
}

const Formula = ({ value, setValue }: FormulaProps) => {

  const allowPred = VIEW === "edit" || TASK.predicate

  return <div
    className="group shrink-0 w-52 min-w-fit h-12 px-2 py-1 border border-solid flex items-center justify-start cursor-text focus:outline-none focus:ring"
    tabIndex={0}
    onKeyPress={e => {
      if (e.key.match(propositionalLogicChars) || (allowPred && e.key.match(predicateLogicChars))) {
        setValue((value ?? "") + e.key);
      }
    }}
    onKeyDown={e => {
      if (e.key === "Backspace") {
        setValue((value ?? "").slice(0, -1));
      }
    }}
  >
    {renderFormulaAsHTML(value ?? "")}
  </div>
}

const FormulaWrapped = ({ name }: { name: string }) => {
  return <Controller name={name} render={({ field: { value, onChange } }) => <Formula value={value} setValue={onChange} />} />
}

export default FormulaWrapped;