import { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form"
import { SemanticTreeType } from "../../schemas/solve";

const calcNumber = (tree: SemanticTreeType) => {

  let number = tree.lines.length

  if (tree.branch) {
    number += calcNumber(tree.branch.left)
    number += calcNumber(tree.branch.right);
  }

  return number;
}

const NumberUpdater = () => {

  const { watch, getValues, setValue } = useFormContext();

  const updateLineNumber = (prefix: string, tree: SemanticTreeType, offset: number) => {

    tree.lines.forEach((_, index) => {
      setValue(`${prefix}lines.${index}.number`, offset + index)
    })

    let lines = tree.lines.length


    if (tree.branch) {

      lines += updateLineNumber(`${prefix}branch.left.`, tree.branch.left, offset + lines)
      lines += updateLineNumber(`${prefix}branch.right.`, tree.branch.right, offset + lines)

    }

    return lines

  }

  const values = watch();

  const numberOfLines = useMemo(() => values && values.lines ? calcNumber(values as SemanticTreeType) : 0, [values])

  useEffect(() => {

    if (numberOfLines == 0) return;

    const values = getValues();

    updateLineNumber("", values as SemanticTreeType, 1);

  }, [numberOfLines, getValues])

  return null;
}

export default NumberUpdater;