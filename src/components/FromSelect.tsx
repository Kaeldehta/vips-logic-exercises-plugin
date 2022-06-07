import { forwardRef, useEffect } from "react";
import { FieldArrayWithId } from "react-hook-form";
import { useFieldArrayContext } from "./FieldArrayProvider";

interface FromSelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: Array<FieldArrayWithId>
}


const FromSelect = forwardRef<HTMLSelectElement, FromSelectProps>(({ options, ...props }, ref) => {

  return <select {...props} ref={ref} className="w-20">
    <option hidden value={-1} />
    {options.map(({ id }, index) => <option key={id} value={index}>{index + 1}</option>)}
  </select>
})

export default FromSelect;