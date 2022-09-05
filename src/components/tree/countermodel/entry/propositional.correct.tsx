import { TreeCounterModelEntryProps } from ".";
import { PropositionalModelType } from "../../../../schemas/tree";

interface PropositionalProps extends TreeCounterModelEntryProps {
  entry: PropositionalModelType;
}

const PropositionalCorrect = (props: PropositionalProps) => {
  return (
    <>
      {props.entry.constant}
      {": "}
      {props.entry.value.toString()}
    </>
  );
};

export default PropositionalCorrect;
