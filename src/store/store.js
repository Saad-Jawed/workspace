import { configureStore } from "@reduxjs/toolkit";
import WindowReducers from '../features/window-ui/windowSlice';
import WallpaperReducers from '../features/wallpaper/wallpaperSlice'

export const store = configureStore({
    reducer: {
        win: WindowReducers,
        wall: WallpaperReducers,
    },
});