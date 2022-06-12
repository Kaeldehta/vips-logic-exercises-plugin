import useFitchProofStoreContext from "../../contexts/fitch";
import { FitchProofType } from "../../schemas/solve";
import Border, { AssumptionBorder, LastPremiseBorder } from "./Border";
import { Index, Switch, Match, For } from "solid-js";

interface IndentProps {
  index: number
  indentation: FitchProofType[number]["indentation"]
  type: FitchProofType[number]["type"]
}

const Indent = (props: IndentProps) => {

  const [store] = useFitchProofStoreContext();

  const nextType = () => store[props.index + 1]?.type;

  const lastPremise = () => props.type === "prem" && nextType() !== "prem";

  return <Index each={Array(props.indentation + 1).fill(0)}>
    {(_, index) => <Switch fallback={<Border />}>
      <Match when={lastPremise()}>
        <LastPremiseBorder />
      </Match>
      <Match when={props.type === "ass" && index == props.indentation}>
        <AssumptionBorder />
      </Match>
    </Switch>
    }
  </Index>
}

export default Indent;