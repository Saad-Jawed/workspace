import { useEffect, useRef, useState } from 'react'

const songs = [
  { id: 1, title: "Night Walk", artist: "Lofi Beats", duration: "2:45" },
  { id: 2, title: "Rain Coding", artist: "Chillhop", duration: "3:10" },
  { id: 3, title: "Midnight Train", artist: "Synthwave", duration: "4:05" },
];

const Music = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRefId = useRef(null);

  const getSongDurationSeconds = (song) => {
    if (!song) return 0;

    const [min, sec] = song.duration.split(":").map(Number);
    return min * 60 + sec;
  };

  const getNextSongIndex = () => {
    const index = songs.findIndex(song => song.id === currentSong.id);
    if (index) {
      return (index + 1) % songs.length;
    } else {
      return 0;
    }
  }

  const getPreviousSongIndex = () => {
    const index = songs.findIndex(song => song.id === currentSong.id);
    if (index) {
      return (index -1) % songs.length;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    clearInterval(intervalRefId.current);

    if (!currentSong || !isPlaying) return;

    const totalSeconds = getSongDurationSeconds(currentSong);

    intervalRefId.current = setInterval(() => {
      setProgress(prev => {

        if (prev >= 100) {
          clearInterval(intervalRefId.current);

          setCurrentSong(songs[getNextSongIndex()])
          setProgress(0)
          setIsPlaying(true)
          return 0
        }

        return Math.min(prev + (100 / totalSeconds), 100);
      })
    }, 1000)

    return () => clearInterval(intervalRefId.current)
  }, [currentSong, isPlaying])

  return (
    <div className='flex flex-col gap-8'>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-inner">
        <h3 className='text-sm font-semibold'>Now Playing</h3>

        {!currentSong && (
          <p className="text-sm text-white/50 italic">
            No song selected
          </p>
        )}

        {currentSong && (
          <>
            <div className="flex gap-4 items-center my-2 ">
              <div className="flex items-center gap-3">

                <div className="flex items-end gap-[3px]">
                  <span className="w-[4px] h-3 bg-green-400 animate-pulse rounded-sm"></span>
                  <span className="w-[4px] h-4 bg-green-400 animate-[pulse_0.6s_ease-in-out_infinite] rounded-sm"></span>
                  <span className="w-[4px] h-3 bg-green-400 animate-pulse rounded-sm"></span>
                </div>

              </div>

              <div className=''>
                <p className="text-base font-semibold">{currentSong.title}</p>
                <p className="text-xs text-white/60">{currentSong.artist} • {currentSong.duration}</p>
              </div>
            </div>

            <div className="flex gap-2 my-3">
              {/* Prev Btn */}
              <button
                className='rounded-lg p-2 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-white/10'
                // onClick={() => setIsPlaying(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-back-icon lucide-skip-back"><path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/></svg>
              </button>

              {/* Play btn */}
              <button
                className='rounded-lg p-2 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-white/10'
                onClick={() => setIsPlaying(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
              </button>

              {/* Pause btn */}
              <button
                className='rounded-lg p-2 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-white/10'
                onClick={() => setIsPlaying(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1" /><rect x="5" y="3" width="5" height="18" rx="1" /></svg>
              </button>

              {/* Next Btn */}
              <button
                className='rounded-lg p-2 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-white/10'
                // onClick={() => setIsPlaying(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-forward-icon lucide-skip-forward"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg>
              </button>
            </div>

            <div className="w-full h-2 bg-white/10 rounded">
              <div className="h-2 bg-indigo-400 rounded" style={{ width: `${progress}%` }} />
            </div>
          </>
        )}
      </div>

      <div className="">
        <h3 className='text-sm font-semibold mb-2'>Playlist</h3>

        <ul>
          {songs.map((song) => {
            const isActive = currentSong?.id === song.id;

            return (
              <li
                key={song.id}
                onClick={() => {
                  setCurrentSong(song)
                  setProgress(0)
                  setIsPlaying(true)
                }}
                className={`flex items-center justify-between text-sm font-semibold py-1 px-3 hover:bg-white/10 hover:cursor-pointer transition-all duration-200 rounded-lg mb-2 border ${isActive ? "bg-white/20 border-white/40 shadow-lg scale-[1.01]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
              >
                <span>
                  <span className="font-semibold">{song.title}</span>
                  <span className="text-white/90"> — {song.artist}</span>
                </span>

                <span className="text-white/90">{song.duration}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Music