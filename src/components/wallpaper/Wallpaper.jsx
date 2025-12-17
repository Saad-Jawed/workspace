import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setWallpaperId } from "../../features/wallpaper/wallpaperSlice";
import { getAllWallpapers } from "../../conf/wallpaperConf";

const Wallpaper = () => {
    const [selectedId, setSelectedId] = useState(null);
    const dispatch = useDispatch();
    const wallpapers = getAllWallpapers();

    const customBg = wallpapers.filter(wallpaper => wallpaper.type === "custom");
    const builtInBg = wallpapers.filter(wallpaper => wallpaper.type === "builtin");

    const handleImageClick = (id) => {
        setSelectedId(id);
        dispatch(setWallpaperId(id))
        console.log("Selected:", id);
    };

    const renderGrid = (items) => (
        <div className="grid grid-cols-2 gap-2">
            {items.map(wallpaper => {
                const isSelected = selectedId === wallpaper.id;

                return (
                    <div
                        key={wallpaper.id}
                        onClick={() => handleImageClick(wallpaper.id)}
                        className={`
                            relative cursor-pointer rounded-md overflow-hidden
                            transition-all duration-200
                            ${isSelected ? "ring-2 ring-white/80" : "opacity-80 hover:opacity-100"}
                        `}
                    >
                        <img
                            src={wallpaper.thumbnail}
                            alt={wallpaper.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />

                        {/* Selected overlay */}
                        {isSelected && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <span className="text-white text-lg">✓</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="space-y-6">

            {/* Custom Wallpapers */}
            <section>
                <h3 className="text-xs font-semibold text-white/80 mb-2">
                    Your Wallpapers
                </h3>

                {customBg.length === 0 ? (
                    <p className="text-xs text-white/40 italic">
                        No custom wallpapers yet
                    </p>
                ) : (
                    renderGrid(customBg)
                )}
            </section>

            {/* Built-in Wallpapers */}
            <section>
                <h3 className="text-xs font-semibold text-white/80 mb-2">
                    Built-in Wallpapers
                </h3>

                {renderGrid(builtInBg)}
            </section>

        </div>
    );
};

export default Wallpaper;
