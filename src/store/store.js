import { configureStore } from "@reduxjs/toolkit";
import WindowReducers from '../features/window-ui/windowSlice';

export const store = configureStore({
    reducer: {
        win: WindowReducers,
    },
});