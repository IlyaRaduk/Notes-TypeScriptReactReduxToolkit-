import { combineReducers,configureStore } from "@reduxjs/toolkit";
import noteListSlice from './reducers/noteListSlice'
import noteSlice from "./reducers/noteSlice";

const rootReducer = combineReducers({
    noteListSlice,
    noteSlice,
})

export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']