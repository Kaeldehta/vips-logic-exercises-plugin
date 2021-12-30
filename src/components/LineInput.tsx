interface Props {
    max: number
    lineNumber?: number,
    setLineNumber: (lineNumber: number | undefined) => void
}

export default ({lineNumber, setLineNumber, max}: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.value == "") {
            setLineNumber(undefined);
            return;
        }

        const number = parseInt(e.target.value);

        if(number > 0 && number <= max) {
            setLineNumber(number);
        }
    }

    return <input 
        className="h-12 bg-gray-100 w-16 text-center"
        required 
        aria-required
        value={lineNumber ?? ""}
        inputMode="numeric"
        onChange={handleChange}
    />
}