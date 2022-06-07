import { Component, createEffect, For, Show } from "solid-js";
import { unwrap } from "solid-js/store";
import { useSemanticTree } from "../state/tree";
import { SemanticTreeNode as SemanticTreeNodeType } from "../../src/types";
import SemanticTreeNode from "./SemanticTreeNode";

const SemanticTree: Component = () => {

    const [tree, { start }] = useSemanticTree();

    const bla = () => unwrap(tree)

    createEffect(() => {
        console.log(bla())
    })

    return <Show when={tree.length} fallback={<button type="button" onClick={() => start()}>+</button>}>
        <For each={tree}>{
            (node, index) => <Show when={node !== undefined} fallback={<div>Bla</div>}>
                <SemanticTreeNode node={node as SemanticTreeNodeType} index={index()} />
            </Show>
        }</For>
    </Show>
}

export default SemanticTree;