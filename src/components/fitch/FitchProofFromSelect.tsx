import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { createEffect, createSignal, Index } from "solid-js";
import useFitchProofStoreContext from "../../contexts/fitch";
import { FitchProofType } from "../../schemas/solve";
import { useFieldArrayContext } from "../FieldArrayProvider";
import FromSelect from "../FromSelect";


interface FitchProofFromSelectProps {
  index: number
  value: number
  accessor: ["from0", "from1"] | ["from", number]
}

const FitchProofFromSelect = (props: FitchProofFromSelectProps) => {

  const [proof, set] = useFitchProofStoreContext();

  const options = () => proof.filter((_, i) => i < props.index);

  const [selected, setSelected] = createSignal(proof[props.value]);

  const index = () => proof.indexOf(selected())

  createEffect(() => {
    set(props.index, index())
  })


  return <select class="w-20" onChange={(e) => {
    setSelected(options()[e.currentTarget.])
  }}>
  <option hidden value={-1} />
  <Index each={options()}>
  {(_, index) => <option value={index}>{index + 1}</option>}
  </Index>
</select>
}

export default FitchProofFromSelect;