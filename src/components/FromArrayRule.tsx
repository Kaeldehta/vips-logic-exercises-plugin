import { useEffect } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { predRulesOptions, propRulesOptions } from "../rules/fitch";
import { FitchProofType } from "../schemas";
import FitchProofFromSelect from "./FitchProofFromSelect";
import FromSelect from "./FromSelect";
import useType from "./useType";
import { TASK } from "../utils";

interface FromArrayProps {
  index: number
}

const options = TASK.predicate ? predRulesOptions : propRulesOptions;

const FromArrayRule = ({ index }: FromArrayProps) => {

  const { register } = useFormContext<FitchProofType>();

  const { fields, replace } = useFieldArray<FitchProofType>({ name: `proof.${index}.from` })

  return <>
    <select className="w-32" {...register(`proof.${index}.rule`, {
      onChange: (e) => {
        const rule = e.target.value as keyof typeof options;
        replace(Array(options[rule].count).fill({}));
      }
    })}>
      <option hidden></option>
      {Object.entries(options).map(([key, { label }]) => <option key={key} value={key}>{label}</option>)}
    </select>
    {fields.map((field, fromIndex) => <FitchProofFromSelect key={field.id} index={index} path={`from.${fromIndex}.line`} />)}
  </>
}

export default FromArrayRule;