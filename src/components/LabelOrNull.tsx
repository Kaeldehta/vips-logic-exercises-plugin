

const LabelOrNull = ({id}: {id: string}) => {

    const premise = true;

    const assumption = true;

    if(premise) return <div>Prem.</div>

    if(assumption) return <div>Ass.</div>

    return null;

}

export default LabelOrNull;