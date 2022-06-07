import { createContext, ReactNode, useContext } from "react"
import { useFieldArray, UseFieldArrayProps, UseFieldArrayReturn } from "react-hook-form";


interface FieldArrayProviderProps {
  fields: UseFieldArrayReturn["fields"]
  children: ReactNode
}

const FieldArrayContext = createContext<UseFieldArrayReturn["fields"]>([]);

export const useFieldArrayContext = () => useContext(FieldArrayContext);

const FieldArrayProvider = ({ children, fields }: FieldArrayProviderProps) => {

  return <FieldArrayContext.Provider value={fields}>
    {children}
  </FieldArrayContext.Provider>
}

export default FieldArrayProvider