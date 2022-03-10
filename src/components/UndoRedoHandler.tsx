import { useDispatch } from "react-redux"
import { ActionCreators } from "redux-undo";
import { useTypedSelector } from "../hooks";

const UndoRedo = () => {

    const dispatch = useDispatch();

    const canUndo = useTypedSelector(state => !!state.response.past.length);
    const canRedo = useTypedSelector(state => !!state.response.future.length);

    return <div>
            <button disabled={!canUndo} type="button" onClick={() => dispatch(ActionCreators.undo())}>Undo</button>
            <button disabled={!canRedo} type="button" onClick={() => dispatch(ActionCreators.redo())}>Redo</button>
        </div>
}

export default UndoRedo;