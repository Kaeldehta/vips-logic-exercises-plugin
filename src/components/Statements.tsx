import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { TaskType } from "../schemas";
import Formula from "./Formula";


const Statements = () => {

  const { fields, append, remove } = useFieldArray<TaskType>({ name: "statements" });

  return <>
    {fields.map(({ id }, index) => <div className="flex items-center" key={id}><Formula name={`statements.${index}.statement`} /><button type="button" onClick={() => remove(index)}><FiMinusCircle /></button></div>)}
    <button type="button" onClick={() => append({})}><FiPlusCircle /></button>
  </>

}

export default Statements;