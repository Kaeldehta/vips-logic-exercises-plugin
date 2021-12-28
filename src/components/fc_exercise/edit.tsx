import EditComponent from "../EditComponent";

interface Props {
    statements: string[],
    consequence: string
}

export default (props: Props) => <EditComponent {...props} separator={<div>{"\u22A2"}<sub>FC</sub></div>}/>;