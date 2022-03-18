import { useDispatch } from "react-redux"
import { ActionCreators } from "redux-undo";
import { useTypedSelector } from "./redux";

const UndoRedo = () => {

    const dispatch = useDispatch();

    const canUndo = useTypedSelector(state => !!state.solution.past.length);
    const canRedo = useTypedSelector(state => !!state.solution.future.length);

    return <div>
            <button disabled={!canUndo} type="button" onClick={() => dispatch(ActionCreators.undo())}>Undo</button>
            <button disabled={!canRedo} type="button" onClick={() => dispatch(ActionCreators.redo())}>Redo</button>
        </div>
}

export default UndoRedo;