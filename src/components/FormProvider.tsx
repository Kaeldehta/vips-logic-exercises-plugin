import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useRef } from "react";
import { FormProvider as RootFormProvider, useForm, UseFormProps } from "react-hook-form"
import { ZodSchema } from "zod";
import { ELEMENT } from "../utils";

interface FormProviderProps<T> {
  schema: ZodSchema<T>
  defaultValues?: UseFormProps<T>["defaultValues"]
  children: ReactNode
}

const FormProvider = <T,>({ schema, defaultValues, children }: FormProviderProps<T>) => {

  const methods = useForm<T>({ resolver: zodResolver(schema), defaultValues });

  const input = useRef<HTMLInputElement>(null);

  const form = useRef(Array.from(document.forms).find((form) => form.contains(ELEMENT)));

  const onSubmit: EventListener = (e) => {

    methods.handleSubmit((values) => {
      if (input.current) {
        input.current.value = JSON.stringify(values)
      }
    }, (errors) => {
      alert(JSON.stringify(errors));
      e.preventDefault()
    })()
  };

  useEffect(() => {
    form.current?.addEventListener("submit", onSubmit);
    return () => form.current?.removeEventListener("submit", onSubmit)
  }, [])

  // useEffect(() => {
  //   if (defaultValues) {
  //     methods.reset(defaultValues, { keepDefaultValues: true })
  //   }
  // }, [defaultValues, methods])

  return <RootFormProvider {...methods}>
    <input type="hidden" ref={input} name="react_form_values" />
    {children}
  </RootFormProvider>
}

export default FormProvider;