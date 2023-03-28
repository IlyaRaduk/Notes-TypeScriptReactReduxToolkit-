import axios from "axios";
import { INote } from "../../models/INote";
import {noteListSlice} from "../reducers/noteListSlice";
import { AppDispatch } from "../store";

const fetchNotes = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(noteListSlice.actions.notesFetching());
        const response = await axios.get<INote[]>('http://localhost:8000/notes');
        dispatch(noteListSlice.actions.notesFetchingSuccess(response.data.reverse()));

    } catch (e) {
        dispatch(noteListSlice.actions.notesFetchingError('Ошибка'));
    }
}
export default fetchNotes;