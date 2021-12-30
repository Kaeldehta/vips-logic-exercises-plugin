
interface Props {
    addBottom?: boolean
    reduceHeight?: boolean
}

export default ({addBottom, reduceHeight}: Props) => {

    let className = "w-4 border-l-2 border-l-black"

    if(reduceHeight) className += " flex self-end h-8";

    if(addBottom) className += " border-b-2 border-b-black";
    
    return <div className={className}/> 
}
    
