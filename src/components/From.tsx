import Select from "react-select";
import type { FromOption } from "../types";
import React from "react";

interface Props {
    options: Array<NonNullable<FromOption>>
    value: FromOption
    setValue: (value: FromOption) => void
}

const From = ({options, value, setValue}: Props) => {

    return <Select 
        className="w-36"
        options={options}
        value={value} 
        onChange={(o) => setValue(o)}
    />
}

export default From;