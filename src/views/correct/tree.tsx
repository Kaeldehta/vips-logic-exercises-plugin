import SemanticTreeCorrect from "../../components/tree/SemanticTreeCorrect";
import { SemanticTreeType } from "../../schemas/solve";

export default () => (
  <SemanticTreeCorrect tree={RESPONSE as SemanticTreeType} />
);
