import axios from "axios";
import { INote } from "../../models/INote";
import { noteSlice } from "../reducers/noteSlice";
import { AppDispatch } from "../store";

const saveEditNote = (currentText: string, editText: string, note:INote) => async (dispatch: AppDispatch) => {
    if (currentText === editText) {
        dispatch(noteSlice.actions.editSwitchOff(currentText));
    }
    else {
        const createTegs = (text: string): string[] => {
            return text.split(/\s/).filter(el => el[0] === '#');
        }
        const newNote: INote = {
            id: note.id,
            date: note.date,
            text: editText,
            teg: createTegs(editText),
        };
        try {
            dispatch(noteSlice.actions.notesFetching());
            let response = await axios.put<INote>(`http://localhost:5000/notes/${note.id}`, newNote);
            if (response.status) {
                dispatch(noteSlice.actions.editSwitchOff(editText));
                dispatch(noteSlice.actions.addTegs(createTegs(editText)));
            }
        } catch (e) {
            dispatch(noteSlice.actions.notesFetchingError('Ошибка'));
        }
    }
}
export default saveEditNote;