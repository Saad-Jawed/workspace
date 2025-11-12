import { createSlice } from "@reduxjs/toolkit";


/* ----------------------------- Helper Functions ----------------------------- */

// Safely find a window by ID
const findWindow = (state, id) => state.windows.find(window => window.id === id);

// Get top-most (highest zIndex) window ID
const getTopWindowId = (windows = []) => {
    if (!windows.length) return null;

    return windows.reduce((top, window) =>
        !top || (window.zIndex ?? 0) > (top.zIndex ?? 0) ? window : top
        , null)?.id ?? null;
};

// Recalculate active window if needed (used in close/minimize)
const updateActiveWindow = (state, closedId) => {
    if (state.activeWindowId !== closedId) return;

    const topId = getTopWindowId(state.windows.filter(window => !window.isMinimized));
    state.activeWindowId = topId ?? "";
};


// Bring a window to front (increases zCounter, updates zIndex)
const bringToFront = (state, targetWindow) => {
    state.zCounter += 1;
    targetWindow.zIndex = state.zCounter;
    targetWindow.isMinimized = false;

    // Reorder so the focused window is last for rendering
    state.windows = [
        ...state.windows.filter(window => window.id !== targetWindow.id),
        targetWindow,
    ];
    state.activeWindowId = targetWindow.id;
};

const initialValue = {
    windows: [
        {
            id: "demo-window",
            toolName: "Tool Name",
            element: "Element to be rendered",
            isMinimized: false,
            position: {
                xOffset: 20,
                yOffset: 20,
            },
            zIndex: 1,
        }
    ],
    zCounter: 1,
    activeWindowId: "demo-window",
}

const windowSlice = createSlice({
    name: "windows",
    initialState: initialValue,
    reducers: {
        // Open a new window (or focus if already open)
        openWindow: (state, action) => {
            const newWindow = action.payload;
            // if (!newWindow || !newWindow?.id) {
            //     alert("Try opening valid tools window!")
            //     return;
            // }

            const existing = findWindow(state, newWindow.id);
            const newOffset = 20 * (state.windows.length + 1);
            if (existing) {
                bringToFront(state, existing);
                return;
            }

            // Assign zIndex from counter
            state.zCounter += 1;
            state.windows.push({
                ...newWindow,
                zIndex: state.zCounter,
                isMinimized: newWindow.isMinimized ?? false,
                position: { xOffset: newOffset, yOffset: newOffset }
            });
            state.activeWindowId = newWindow.id;
        },

        // Close a window and set new active window if needed
        closeWindow: (state, action) => {
            const id = action.payload;
            if (!id) return;

            state.windows = state.windows.filter(win => win.id !== id);

            // If closed window was active, pick a new active window (top-most)
            updateActiveWindow(state, id);
        },

        // Sets the isMinimized flag to true for a specific window.
        minimizeWindow: (state, action) => {
            const id = action.payload;
            const window = findWindow(state, id);
            if (!window) return;

            window.isMinimized = true;

            // If it was the active window, choose a new active window
            updateActiveWindow(state, id);

            // state.windows = state.windows.map(win => win.id === action.payload ? { ...win, isMinimized: true } : win);
        },

        // Focus / bring window to front
        focusWindow: (state, action) => {
            const id = action.payload;
            const window = findWindow(state, id);
            if (window) bringToFront(state, window);
        },

        // Updates the xOffset and yOffset coordinates when a user drags a window.
        updateWindow: (state, action) => {
            const { id, data } = action.payload || {};
            if (!id) return;

            const window = findWindow(state, id);
            if (!window) return;

            if (typeof data.xOffset === "number") window.position.xOffset = data.xOffset;
            if (typeof data.yOffset === "number") window.position.yOffset = data.yOffset;
        },
    }
});

export const { openWindow, closeWindow, focusWindow, minimizeWindow, updateWindow } = windowSlice.actions;
export default windowSlice.reducer;