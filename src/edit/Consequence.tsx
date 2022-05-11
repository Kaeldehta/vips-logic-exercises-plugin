import Formula from "../components/Formula";
import { getTask } from "../utils";
import { useState } from "react";

const Consequence = () => {

    const [value, setValue] = useState(getTask<{consequence: string}>()?.consequence ?? "")

    return <Formula name="consequence" allowPred value={value} setValue={setValue} />;
};

export default Consequence;