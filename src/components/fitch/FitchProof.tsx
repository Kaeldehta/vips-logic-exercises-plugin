import { Fragment } from "react";
import { useFieldArray } from "react-hook-form"
import { FitchProofType } from "../../schemas/solve";
import FieldArrayProvider from "../FieldArrayProvider";
import FitchProofLine from "./FitchProofLine";
import Inserter from "./Inserter";


const FitchProof = () => {

  const { fields, remove, insert, append } = useFieldArray<FitchProofType>({ name: "proof" });

  return <FieldArrayProvider fields={fields}>
    {fields.map((field, index) => <Fragment key={field.id}>
      <FitchProofLine index={index} remove={remove} />
      <Inserter index={index} insert={insert} />
    </Fragment>)}
    {/* {!fields.length && <Inserter index={-1} insert={insert} />} */}
    {!fields.length && <button onClick={() => append({ type: "prem", indentation: 0 })} type="button">Add</button>}
  </FieldArrayProvider>

}

export default FitchProof;