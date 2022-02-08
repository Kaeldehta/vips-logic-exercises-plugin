import Select from "react-select";
import { FromOption } from "../types";

interface Props {
    options: Array<FromOption>
    value: FromOption
    setValue: (value: FromOption) => void
}

const From = ({options, value, setValue}: Props) => {

    return <Select 
        className="w-32"
        options={options}
        value={value} 
        onChange={(o) => setValue(o)}
    />
}

export default From;