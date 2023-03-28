import axios from "axios";
import { INote } from "../../models/INote";
import { noteListSlice } from "../reducers/noteListSlice";
import { AppDispatch } from "../store";

const createNote = (text: string) => async (dispatch: AppDispatch) => {
    const createDate = (): string => {
        let date = new Date();
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1);
        let day = String(date.getDate());
        let hours = String(date.getHours());
        let min = String(date.getMinutes());
        if (+month < 10) month = '0' + month;
        if (+day < 10) day = '0' + day;
        if (+hours < 10) hours = '0' + min;
        if (+min < 10) min = '0' + min;
        return day + '.' + month + '.' + year.slice(2) + ' ' + hours + ":" + min;

    }
    const createTegs = (text: string): string[] => {
       return text.split(/\s/).filter(el => el[0] === '#');
    }

    const newNote: INote = {
        id: Date.now(),
        date: createDate(),
        text: text,
        teg: createTegs(text),
    };
    try {
        dispatch(noteListSlice.actions.notesFetching());
        let response = await axios.post<INote>('http://localhost:8000/notes', newNote);
        if (response.status) {
            dispatch(noteListSlice.actions.addNote(response.data));
        }
    } catch (e) {
        dispatch(noteListSlice.actions.notesFetchingError('Ошибка'));
    }
}
export default createNote;