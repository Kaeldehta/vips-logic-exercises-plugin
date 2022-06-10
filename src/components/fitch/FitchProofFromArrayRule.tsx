import { useFieldArray, useFormContext } from "react-hook-form";
import fitchRuleOptions from "../../rules/fitch";
import { FitchProofType } from "../../schemas/solve";
import FitchProofFromSelect from "./FitchProofFromSelect";

interface FromArrayProps {
  index: number
}

const FromArrayRule = ({ index }: FromArrayProps) => {

  const { register } = useFormContext<FitchProofType>();

  const { fields, replace } = useFieldArray<FitchProofType>({ name: `proof.${index}.from` })

  return <>
    <select className="w-32" {...register(`proof.${index}.rule`, {
      onChange: (e) => {
        const rule = e.target.value as keyof typeof fitchRuleOptions;
        replace(Array(fitchRuleOptions[rule].count).fill({}));
      }
    })}>
      <option hidden></option>
      {Object.entries(fitchRuleOptions).map(([key, { label }]) => <option key={key} value={key}>{label}</option>)}
    </select>
    {fields.map((field, fromIndex) => <FitchProofFromSelect key={field.id} index={index} path={`from.${fromIndex}.line`} />)}
  </>
}

export default FromArrayRule;