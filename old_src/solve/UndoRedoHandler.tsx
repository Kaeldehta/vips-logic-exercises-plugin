const UndoRedo = () => {

    const canUndo = /*TODO*/true
    const canRedo = /*TODO*/true

    return <div>
            <button disabled={!canUndo} type="button" onClick={() => {}}>Undo</button>
            <button disabled={!canRedo} type="button" onClick={() => {}}>Redo</button>
        </div>
}

export default UndoRedo;