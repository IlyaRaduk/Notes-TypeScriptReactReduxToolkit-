import axios from "axios";
import { INote } from "../../models/INote";
import { noteSlice } from "../reducers/noteSlice";
import { AppDispatch } from "../store";

const fetchOneNote = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(noteSlice.actions.notesFetching());
        const response = await axios.get<INote[]>('https://rest-json-server.vercel.app/notes');
        const note = response.data.find((el) => el.id == id);
        if (!note){
           throw 'Ошибка';
        }
        dispatch(noteSlice.actions.notesFetchingSuccess(note));

    } catch (e) {
        dispatch(noteSlice.actions.notesFetchingError('Ошибка'));
    }
}
export default fetchOneNote;