import IconButton from "../IconButton";

interface InserterProps {
    prefix?: string,
    index: number,
    noBranch: boolean,
    insert: UseFieldArrayInsert<any>
}

const Inserter = ({ prefix = "", insert, index, noBranch }: InserterProps) => {

    const { watch, setValue } = useFormContext();

    const type = watch(`${prefix}lines.${index}.type`);

    if (type === "abs") return null;

    return <div className="group h-16 group w-40 flex justify-center gap-2 items-center">
        {noBranch && <IconButton onClick={() => {
            insert(index + 1, { type: "abs" })
        }}>{"\u22A5"}</IconButton>}
        <IconButton onClick={() => insert(index + 1, { type: "ass", formula: "" })} ><FiPlusCircle /></IconButton>
        <IconButton onClick={() => insert(index + 1, { type: "rule", formula: "" })}><FiArrowDownCircle /></IconButton>
        {noBranch && <IconButton onClick={() => {
            setValue(`${prefix}branch`, { left: { lines: [{ type: "rule", formula: "" }] }, right: { lines: [{ type: "rule", formula: "" }] } })
        }}>B</IconButton>}
    </div>
}

export default Inserter;
