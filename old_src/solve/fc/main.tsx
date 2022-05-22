import { useAtomValue, useSetAtom } from "jotai";
import { FiArrowRightCircle, FiPlusCircle } from "react-icons/fi";
import Button from "../../components/Button";
import LineWrapper from "../../components/LineWrapper";
import render from "../../render";
import { ViewType } from "../../types";
import { insertAssumptionAtom, insertPremiseAtom, noLinesAtom } from "../atoms/fc";
import Lines from "./Lines";

const FCSolveView: ViewType = () => {

    const noLines = useAtomValue(noLinesAtom);

    const insertPremise = useSetAtom(insertPremiseAtom);

    const insertAssumption = useSetAtom(insertAssumptionAtom);

    return <div className="w-full">

        {/* <Task/> */}

        {/* <UndoRedo/> */}

        {noLines && <LineWrapper>
        <div className="h-12"/>
            <Button icon={FiPlusCircle} onClick={() => insertPremise(0)}/>
            <Button icon={FiArrowRightCircle} onClick={() => insertAssumption({index: 0, indentation: 1})}/>
        </LineWrapper>
        }

        {!noLines && <Lines />}
        
    </div>
}

render(FCSolveView);