import style from './inputAdd.module.scss';
import { FC } from "react";
import { useAppDisaptch, useAppSelector } from "../../hooks/redux";
import { noteListSlice } from "../../store/reducers/noteListSlice";
import createNote from "../../store/ThunkCreators/createNote";

const InputAddNote: FC = () => {
    const { noteInput } = useAppSelector((state => state.noteListSlice))
    const dispatch = useAppDisaptch();

    return (
        <div className={style.field}>
            <label className={style.field__label} htmlFor="addNote">Your note</label>
            <div>
                <textarea
                    className={style.field__textarea}
                    autoFocus={true}
                    name='addNote' value={noteInput}
                    onChange={(e) => dispatch(noteListSlice.actions.noteInput(e.target.value))}>
                </textarea>
                <button className={style.field__submit} onClick={() => dispatch(createNote(noteInput))}>Create note</button>
            </div>
        </div>
    )
}
export default InputAddNote;