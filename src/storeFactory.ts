import { createStore } from "solid-js/store";
import { z } from "zod";

const storeFactory = <T, Z>(
  initialValues: T,
  schema: z.Schema<Z, z.ZodTypeDef, T>
) => {
  const [get, set] = createStore(schema.parse(initialValues));

  return [get, set];
};

export default storeFactory;
