import { INote } from "../../models/INote";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InoteState {
    note: INote,
    isLoading: boolean,
    error: string,
    isActiveEdit: boolean,
    textEdit: string,
}

const innitialNullObject: INote = {
    id: 0,
    date: '',
    text: '',
}

const initialState: InoteState = {
    note: innitialNullObject,
    isLoading: false,
    error: "",
    isActiveEdit: false,
    textEdit: '',
}

export const noteSlice = createSlice({
    name: "noteSlice",
    initialState,
    reducers: {
        notesFetching(state) {
            state.isLoading = true;
        },
        notesFetchingSuccess(state, action: PayloadAction<INote>) {
            state.isLoading = false;
            state.error = '';
            state.note = action.payload;
        },
        notesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        editSwitchOn(state) {
            state.isActiveEdit = true;
            state.textEdit = state.note.text;
        },
        editSwitchOff(state, action: PayloadAction<string>) {
            state.isActiveEdit = false;
            state.note.text = action.payload;
            state.isLoading = false;
        },
        editText(state, action: PayloadAction<string>) {
            state.textEdit = action.payload;
        },
        addTegs(state, action: PayloadAction<string[]>) {
             state.note.teg=[...action.payload];
        },
    }
})

export default noteSlice.reducer;