import { onCleanup, onMount } from "solid-js";
import { ZodSchema } from "zod";
import { ELEMENT } from "../utils";

interface ValidatorProps<T> {
  values: T;
  schema: ZodSchema<T>;
}

const Validator = <T,>(props: ValidatorProps<T>) => {
  const form = Array.from(document.forms).find((form) =>
    form.contains(ELEMENT)
  );

  const callback = (e: Event) => {
    const result = props.schema.safeParse(props.values);

    if (!result.success) {
      e.preventDefault();
      console.log(result.error.formErrors.fieldErrors);
    }
  };

  onMount(() => {
    form?.addEventListener("submit", callback);
  });

  onCleanup(() => {
    form?.removeEventListener("submit", callback);
  });

  return null;
};

export default Validator;
