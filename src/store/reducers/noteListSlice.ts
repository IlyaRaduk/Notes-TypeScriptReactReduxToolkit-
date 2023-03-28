import { INote } from "../../models/INote";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InoteListState {
    notes: INote[],
    isLoading: boolean,
    error: string,
    noteInput: string,
    modalActive: boolean,
    tagsInput: string,
    tags: string[],
}

const initialState: InoteListState = {
    notes: [],
    isLoading: false,
    error: "",
    noteInput: '',
    modalActive: false,
    tagsInput: '',
    tags: [],
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
        tagsInput(state, action: PayloadAction<string>) {
            state.tagsInput = action.payload;
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
        addTag(state, action: PayloadAction<string>) {
            state.tags.push('#' + action.payload);
            state.tagsInput = '';
        },
        removeTag(state, action: PayloadAction<number>) {
            state.tags.splice(action.payload, 1);
        },
    }
})

export default noteListSlice.reducer;