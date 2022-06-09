import { Fragment } from "react"
import { render } from "react-dom"
import { FitchProofTask } from "../schemas"
import { TASK } from "../utils"
import { renderFormulaAsHTML } from "../utils"


const FitchProofTaskRender = () => {

  const { consequence, statements } = TASK as FitchProofTask

  return <div className="flex gap-1 justify-start mb-8">
    Prove
    {statements.map(({ statement }, index) => <b className="flex" key={index}>{renderFormulaAsHTML(statement)}{index < statements.length - 1 && ","}</b>)}
    <b>{"\u22A2"}<sub>FC</sub></b>
    <b className="flex">{renderFormulaAsHTML(consequence)}</b>
  </div >
}

export default FitchProofTaskRender