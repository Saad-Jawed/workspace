export const BUILTIN_WALLPAPERS = [
    {
        id: "coding-girl-2",
        type: "builtin",
        name: "Coding Girl 2",
        thumbnail: "/bg-images/coding-girl-2.png",
        full: "/bg-images/coding-girl-2.png"
    },
    {
        id: "coding-girl",
        type: "builtin",
        name: "Coding Girl",
        thumbnail: "/bg-images/coding-girl.png",
        full: "/bg-images/coding-girl.png"
    },
    {
        id: "coding-night-cityscape",
        type: "builtin",
        name: "Coding Night Citysracpe",
        thumbnail: "/bg-images/coding-night-citysracpe.png",
        full: "/bg-images/coding-night-citysracpe.png"
    },
    {
        id: "cozy-table",
        type: "builtin",
        name: "Coding Table",
        thumbnail: "/bg-images/cozy-table.png",
        full: "/bg-images/cozy-table.png"
    },
    {
        id: "seaside-view",
        type: "builtin",
        name: "Seaside View",
        thumbnail: "/bg-images/seaside-view.png",
        full: "/bg-images/seaside-view.png"
    },
    {
        id: "retro-office",
        type: "builtin",
        name: "Retro Office",
        thumbnail: "/bg-images/retro-office.png",
        full: "/bg-images/retro-office.png"
    },
    {
        id: "night-city-view",
        type: "builtin",
        name: "Night City View",
        thumbnail: "/bg-images/night-city-view.png",
        full: "/bg-images/night-city-view.png"
    },
    {
        id: "cozy-desk",
        type: "builtin",
        name: "Cozy Desk",
        thumbnail: "/bg-images/cozy-desk.png",
        full: "/bg-images/cozy-desk.png"
    },
    {
        id: "lofi-bg",
        type: "builtin",
        name: "Lofi Girl",
        thumbnail: "/bg-images/lofi-bg.jpg",
        full: "/bg-images/lofi-bg.jpg"
    },
    {
        id: "evening-sky",
        type: "builtin",
        name: "Evening Sky",
        thumbnail: "/bg-images/evening-sky.png",
        full: "/bg-images/evening-sky.png"
    },
    {
        id: "evening-sky-2",
        type: "builtin",
        name: "Evening Sky 2",
        thumbnail: "/bg-images/evening-sky-2.png",
        full: "/bg-images/evening-sky-2.png"
    },
    {
        id: "rainy-workspace",
        type: "builtin",
        name: "Rainy Workspace",
        thumbnail: "/bg-images/rainy-workspace.png",
        full: "/bg-images/rainy-workspace.png"
    },
    {
        id: "rainy-cafe",
        type: "builtin",
        name: "Rainy Cafe",
        thumbnail: "/bg-images/rainy-cafe.png",
        full: "/bg-images/rainy-cafe.png"
    },
];

const CUSTOM_WALLPAPER_KEY = "workspace.customWallpapers";

export function getCustomWallpapers() {
    try {
        const data = JSON.parse(localStorage.getItem(CUSTOM_WALLPAPER_KEY));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export function saveCustomWallpapers(wallpapers) {
    localStorage.setItem(CUSTOM_WALLPAPER_KEY, JSON.stringify(wallpapers));
}

export function getAllWallpapers() {
    const customWallpapers = getCustomWallpapers();
    return [
        ...customWallpapers,
        ...BUILTIN_WALLPAPERS,
    ]
}

export function getBuiltInWallpaperById(wallpaperId) {
    const data = BUILTIN_WALLPAPERS.filter(wallpaper => wallpaper.id === wallpaperId);
    return data[0].full;
}