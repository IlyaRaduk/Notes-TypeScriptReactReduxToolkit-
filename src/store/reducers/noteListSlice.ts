import { INote } from "../../models/INote";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InoteListState {
    notes: INote[],
    isLoading: boolean,
    error: string,
    noteInput: string,
    modalActive: boolean,
    tegsInput: string,
    tegs: string[],
}

const initialState: InoteListState = {
    notes: [],
    isLoading: false,
    error: "",
    noteInput: '',
    modalActive: false,
    tegsInput: '',
    tegs: [],
}

export const noteListSlice = createSlice({
    name: "noteListSlice",
    initialState,
    reducers: {
        notesFetching(state) {
            state.isLoading = true;
        },
        notesFetchingSuccess(state, action: PayloadAction<INote[]>) {
            state.isLoading = false;
            state.error = '';
            state.notes = action.payload;
        },
        notesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        noteInput(state, action: PayloadAction<string>) {
            state.noteInput = action.payload;
        },
        tegsInput(state, action: PayloadAction<string>) {
            state.tegsInput = action.payload;
        },
        addNote(state, action: PayloadAction<INote>) {
            state.notes.unshift(action.payload);
            state.noteInput = '';
            state.isLoading = false;
            state.modalActive = false;
        },
        deleteNote(state, action: PayloadAction<number>) {
            state.notes = state.notes.filter((el) => el.id !== action.payload);
            state.isLoading = false;
        },
        setActivModal(state, action: PayloadAction<boolean>) {
            state.modalActive = action.payload;
        },
        addTeg(state, action: PayloadAction<string>) {
            state.tegs.push('#' + action.payload);
            state.tegsInput = '';
        },
        removeTeg(state, action: PayloadAction<number>) {
            state.tegs.splice(action.payload, 1);
        },
    }
})

export default noteListSlice.reducer;