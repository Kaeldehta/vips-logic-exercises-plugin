
interface Props {
    addBottom?: boolean
}

export default ({addBottom}: Props) =>
    <div className={"w-4 border-l-2 border-l-black" + (addBottom ? " border-b-2 border-b-black" : "")}/> 
