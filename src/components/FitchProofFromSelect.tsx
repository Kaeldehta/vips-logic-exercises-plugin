import { useEffect, useState } from "react";
import { useFieldArray, useFormContext, UseFormRegister, useWatch } from "react-hook-form";
import { FitchProofType } from "../schemas";
import { useFieldArrayContext } from "./FieldArrayProvider";
import FromSelect from "./FromSelect";


interface FitchProofFromSelectProps {
  index: number
  path: "from0" | "from1" | `from.${number}.line`
}

const FitchProofFromSelect = ({ index, path }: FitchProofFromSelectProps) => {

  const { register, setValue } = useFormContext<FitchProofType>();

  const fields = useFieldArrayContext();

  const options = fields.filter((_, i) => i < index);

  const value = useWatch<FitchProofType>({ name: `proof.${index}.${path}` }) as number;

  const [selectedId, setId] = useState(value > -1 ? fields[value]?.id : undefined);

  useEffect(() => {
    setValue(`proof.${index}.${path}`, fields.findIndex(({ id }) => id === selectedId))
  }, [fields, selectedId])

  return <FromSelect {...register(`proof.${index}.${path}`, {
    valueAsNumber: true, onChange: (e) => {
      setId(fields[e.target.value].id)
    }
  })} options={options} />
}

export default FitchProofFromSelect;