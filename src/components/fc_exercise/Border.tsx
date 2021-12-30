
interface Props {
    addBottom?: boolean
}

export default ({addBottom}: Props) => {
    if(addBottom) {
        return <div className="flex self-end h-8 w-4 border-l-2 border-l-black border-b-2 border-b-black"/>
    }
    
    return <div className="w-4 border-l-2 border-l-black"/> 
}
    
