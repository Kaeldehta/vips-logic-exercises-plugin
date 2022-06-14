import { onCleanup, onMount } from "solid-js";
import { ZodSchema } from "zod";
import { ELEMENT } from "../utils";

interface SubmitterProps<T> {
  values: T;
  schema: ZodSchema<T>;
}

const Submitter = <T,>(props: SubmitterProps<T>) => {
  const form = Array.from(document.forms).find((form) =>
    form.contains(ELEMENT)
  );

  const callback = (e: Event) => {
    const result = props.schema.safeParse(props.values);

    if (!result.success) {
      e.preventDefault();
      alert(result.error.message);
    }
  };

  onMount(() => {
    form?.addEventListener("submit", callback);
  });

  onCleanup(() => {
    form?.removeEventListener("submit", callback);
  });

  return (
    <input
      type="hidden"
      name="react_values"
      value={JSON.stringify(props.values)}
    />
  );
};

export default Submitter;
