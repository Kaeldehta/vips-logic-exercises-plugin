import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useRef } from "react";
import { FormProvider as RootFormProvider, useForm, UseFormProps, UseFormRegister } from "react-hook-form"
import { ZodSchema } from "zod";
import { createSyntheticEvent, ELEMENT } from "../utils";

interface FormProviderProps<T> {
  schema: ZodSchema<T>
  defaultValues?: UseFormProps<T>["defaultValues"]
  children: ReactNode
}

const FormProvider = <T,>({ schema, defaultValues, children }: FormProviderProps<T>) => {

  const methods = useForm<T>({ resolver: zodResolver(schema) });

  const input = useRef<HTMLInputElement>(null);

  const form = useRef(Array.from(document.forms).find((form) => form.contains(ELEMENT)));

  const callback = (e: SubmitEvent) => methods.handleSubmit((values) => {
    if (input.current) {
      input.current.value = JSON.stringify(values)
    }
    form.current?.submit()
    // console.log(JSON.stringify(values))
  }, (errors) => console.log(errors))(createSyntheticEvent(e));

  useEffect(() => {
    form.current?.addEventListener("submit", callback);
    return () => form.current?.removeEventListener("submit", callback)
  }, [])

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues, { keepDefaultValues: true })
    }
  }, [defaultValues, methods])

  return <RootFormProvider {...methods}>
    <input type="hidden" ref={input} name="react_form_values" />
    {children}
  </RootFormProvider>
}

export default FormProvider;