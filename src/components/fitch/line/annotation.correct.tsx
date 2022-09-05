import { FitchProofType } from "../../../schemas/fitch";

const FitchLineAnnotationCorrect = (props: {
  annotation: FitchProofType[number]["annotation"];
}) => {
  return <span>{props.annotation}</span>;
};

export default FitchLineAnnotationCorrect;
