import { useEffect } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { predRulesOptions } from "../rules/fitch";
import { FitchProofType } from "../schemas";
import FitchProofFromSelect from "./FitchProofFromSelect";
import FromSelect from "./FromSelect";
import useType from "./useType";

interface FromArrayProps {
  index: number
}

const FromArrayRule = ({ index }: FromArrayProps) => {

  const { register } = useFormContext<FitchProofType>();

  const { fields, replace } = useFieldArray<FitchProofType>({ name: `proof.${index}.from` })

  return <>
    <select className="w-20" {...register(`proof.${index}.rule`, {
      onChange: (e) => {
        const rule = e.target.value as keyof typeof predRulesOptions;
        replace(Array(predRulesOptions[rule].count).fill({}));
      }
    })}>
      <option hidden></option>
      {Object.entries(predRulesOptions).map(([key, { label }]) => <option key={key} value={key}>{label}</option>)}
    </select>
    {fields.map((field, fromIndex) => <FitchProofFromSelect key={field.id} index={index} path={`from.${fromIndex}.line`} />)}
  </>
}

export default FromArrayRule;