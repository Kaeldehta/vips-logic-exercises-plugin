
interface Props {
    test: string
}

const EditComponent = ({test}: Props) => {

    return <div>
        {test}
    </div>
}

export default EditComponent;