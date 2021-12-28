import {isAbsurdity, isAssumption, isPremise} from './domain';
import Absurdity from "./Absurdity";
import Assumption from "./Assumption";
import OtherRules from "./OtherRules";
import Premise from './Premise';
import { useLine } from './context';
import LineWrapper from './LineWrapper';

import {FiXCircle} from "react-icons/fi";
import Border from './Border';
import BorderRepeat from './BorderRepeat';

export default () => {

    const {line, lineNumber, removeLine} = useLine(); 

    return <LineWrapper height='h-12' head={lineNumber + 1}>
        <BorderRepeat times={line.indentationLevel} />
        {<Border addBottom={isAssumption(line)}/>}
        {
            isAbsurdity(line) ? 
            <Absurdity/> :
            isAssumption(line) ?
            <Assumption/> :
            isPremise(line) ?
            <Premise/> :
            <OtherRules/>
        }

        <button type="button" className="group-hover:block hidden" onClick={removeLine}><FiXCircle/></button>
    </LineWrapper>
}