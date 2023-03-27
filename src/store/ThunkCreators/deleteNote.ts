import axios from "axios";
import { INote } from "../../models/INote";
import { noteListSlice } from "../reducers/noteListSlice";
import { AppDispatch } from "../store";

const deleteNote = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(noteListSlice.actions.notesFetching());
        let response = await axios.delete<INote>(`http://localhost:5000/notes/${id}`);
        if(response.status){
            dispatch(noteListSlice.actions.deleteNote(id)); 
        }
    } catch (e) {
        dispatch(noteListSlice.actions.notesFetchingError('Ошибка'));
    }
}
export default deleteNote;