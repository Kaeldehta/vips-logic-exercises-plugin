import EditComponent from "../../EditComponent";

interface Props {
    statements: string[],
    consequence: string
}

export default (props: Props) => <EditComponent {...props} separator={"\u22A8"}/>;