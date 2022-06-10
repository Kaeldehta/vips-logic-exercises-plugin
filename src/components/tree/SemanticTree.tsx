import { Fragment, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import IconButton from "../IconButton";
import Inserter from "./Inserter";
import SemanticTreeLine from "./SemanticTreeLine";


const SemanticTree = ({ prefix = "" }: { prefix?: string }) => {

  const { watch } = useFormContext();

  const { fields, remove, insert, append } = useFieldArray({ name: `${prefix}lines` });


  // useEffect(() => {
  //   console.log(prefix, fields.length)
  // }, [fields.length])

  const branch = watch(`${prefix}branch`);

  return <div className="flex flex-col gap-1 justify-start items-center">
    {fields.map((field, index) => <Fragment key={field.id}>
      <SemanticTreeLine prefix={prefix} index={index} remove={remove} />
      <Inserter prefix={prefix} index={index} insert={insert} noBranch={index === fields.length - 1 && branch === undefined} />
    </Fragment>
    )}
    {!fields.length && <div className="group w-20 h-10"><IconButton onClick={() => append({ type: "ass" })}>Start</IconButton></div>}
    {branch && <div className="flex gap-8">
      <SemanticTree prefix={`${prefix}branch.left.`} />
      <SemanticTree prefix={`${prefix}branch.right.`} />
    </div>
    }
  </div>
}

export default SemanticTree;