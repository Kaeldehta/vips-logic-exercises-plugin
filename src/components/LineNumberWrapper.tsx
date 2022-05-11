interface LineNumberWrapperProps {
    number: number
}

const LineNumberWrapper = ({number}: LineNumberWrapperProps) => {
    
    return <div className="shrink-0 flex items-center w-12">{number}</div>
}

export default LineNumberWrapper;