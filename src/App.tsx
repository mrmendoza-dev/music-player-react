import { useState, useEffect, useRef } from "react";
import './css/App.css'
import { songData } from "./songData";
import Slider from "./components/slider/Slider";
import Volume from "./components/Volume/Volume";
import ControlPanel from "./components/controls/ControlPanel";



function HeartSong(props: any) {
  return (
    <button
      className="heart-btn"
      onClick={() => {
        props.addToFavorites(props.currentSong.id);
      }}
    >
      {props.favorites.includes(props.currentSong.id) ? (
        <i className="fa-solid fa-heart highlighted"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </button>
  );
}





export default function App() {
  const [songs, setSongs] = useState(songData);
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [favorites, setFavorites] = useState<any>([]);
  
  const [volume, setVolume] = useState(50);
  const [lastVolume, setLastVolume] = useState(50);

  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<any>(null);
  

  useEffect(() => {
    setSongs(songData);
    setSongIndex(Math.floor(Math.random() * songs.length));
    resetTime();
  }, []);

    useEffect(() => {
      const audio = audioRef.current;
      audio.volume = volume / 100;
        }, [volume]);

  useEffect(() => {
    setCurrentSong(songs[songIndex]);
    // setIsPlaying(false);
    setIsPlaying(false);
    resetTime();
  }, [songIndex]);



  function checkFlags() {
    if (repeat) {
      setSongIndex((prevIndex) => prevIndex);
    } else if (shuffle) {
      let randomIndex = Math.floor(Math.random() * songs.length);
      setSongIndex(randomIndex);
    }
  }

  function nextSong() {
    if (shuffle || repeat) {
      checkFlags();
    } else {
      if (songIndex === songs.length - 1) {
        setSongIndex(0);
      } else {
        setSongIndex((prevIndex) => prevIndex + 1);
      }
    }
  }

  function prevSong() {
    if (shuffle || repeat) {
      checkFlags();
    } else {
      if (songIndex === 0) {
        setSongIndex(songs.length - 1);
      } else {
        setSongIndex((prevIndex) => prevIndex - 1);
      }
    }
  }


  function toggleShuffle() {
    setShuffle((prevFlag) => !prevFlag);
  }

  function toggleRepeat() {
    setRepeat((prevFlag) => !prevFlag);
  }

  function addToFavorites(id: any) {
    let favoritesList = favorites.splice(0)
    if (favoritesList.includes(id)) {
      favoritesList = favoritesList.filter((e: any) => e !== id);
    } else {
    favoritesList.push(id);
    }
    setFavorites(favoritesList);
  }

  function resetTime() {
    setCurrentTime(0);
  }


  const changeVolume = (e: any) => {
    if (e.target.value < 3) {
      setVolume(0);
    } else {
      setVolume(e.target.value);
    }
  };

  function muteVolume() {
    if (volume === 0) {
      setVolume(lastVolume);
    } else {
      setVolume(0);
      setLastVolume(volume)
    }
  }
  

  const onChange = (e: any) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };


  function playSong() {
    const audio = audioRef.current;
    audio.volume = volume / 100;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  }




  const getCurrDuration = (e: any) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  function secondsToHms(seconds: any) {
    if (!seconds) return "0:00";

    let duration = seconds;
    let hours: any = duration / 3600;
    duration = duration % 3600;

    let min: any = parseInt(String(duration / 60));
    duration = duration % 60;

    let sec: any = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    // if (min < 10) {
    //   min = `0${min}`;
    // }
    if (min < 10) {
      min = `${min}`;
    }


    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
    } else if (min == 0) {
      return `0:${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  }

  return (
    <div className="WebPlayer">
      <div className="WebPlayer">
        <div className="wp-main">
          <div className="wp-main-sidebar">
            <div className="">
              <div className="wp-sidebar-tab">
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <div className="wp-sidebar-tab">
                <i className="fa-solid fa-house"></i> <p>Home</p>
              </div>
              <div className="wp-sidebar-tab">
                <i className="fa-solid fa-magnifying-glass"></i> <p>Search</p>
              </div>
              <div className="wp-sidebar-tab">
                <i className="fa-solid fa-book-open"></i> <p>Your Library</p>
              </div>
            </div>

            <div className="song-img-block">
              <img
                className="song-img"
                src={currentSong.img}
                alt="music-cover"
                id="cover"
              />
            </div>
          </div>
          <div className="wp-main-content">
            <div className="wp-list-header">
              <div className="">
                <button className="">
                  <i className="fa-solid fa-play"></i>
                </button>
              </div>
              <div className="">
                <button className="">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <div className="wp-list-content">
              <table className="wp-song-table">
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Title</td>
                    <td>Album</td>
                    <td>
                      <i className="fa-regular fa-clock"></i>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {songs.map((song, index) => {
                    return (
                      <tr className="wp-table-row">
                        <td>{index + 1}</td>

                        <td className="wp-table-song">
                          <img src={song.img} className="wp-table-img" />
                          <div className="wp-table-song-info">
                            <p>{song.name}</p>
                            <p>{song.artist}</p>
                          </div>
                        </td>

                        <td>{song.album}</td>
                        <td className="wp-table-dur">
                          <HeartSong
                            addToFavorites={addToFavorites}
                            currentSong={song}
                            favorites={favorites}
                          />
                          <p>1:26</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="wp-controls">
          <div className="wp-controls-song">
            <div className="">
              <p className="song-name">{currentSong.name}</p>
              <p className="song-artist">{currentSong.artist}</p>
            </div>
            <HeartSong
              addToFavorites={addToFavorites}
              currentSong={currentSong}
              favorites={favorites}
            />
          </div>
          <div className="wp-controls-main">
            <div className="">
              <div className="song-controls">
                <ControlPanel
                  songList={songs}
                  playSong={playSong}
                  isPlaying={isPlaying}
                  duration={duration}
                  currentTime={currentTime}
                  nextSong={nextSong}
                  prevSong={prevSong}
                  toggleShuffle={toggleShuffle}
                  toggleRepeat={toggleRepeat}
                  shuffle={shuffle}
                  repeat={repeat}
                />
              </div>
            </div>
            <div className="">
              <div className="song-time">
                <Slider percentage={percentage} onChange={onChange} />

                <div className="times">
                  <div className="timer">{secondsToHms(currentTime)}</div>
                  <div className="timer">{secondsToHms(duration)}</div>
                </div>
                <audio
                  ref={audioRef}
                  onTimeUpdate={getCurrDuration}
                  onLoadedData={(e: any) => {
                    setDuration(e.currentTarget.duration.toFixed(2));
                  }}
                  onEnded={nextSong}
                  src={currentSong.mp3}
                ></audio>
              </div>
            </div>
          </div>
          <div className="wp-controls-sub">
            <div className="volume-control">
              <button className="mute-btn" onClick={muteVolume}>
                {volume >= 50 ? (
                  <i className="fa-solid fa-volume-high"></i>
                ) : volume > 0 ? (
                  <i className="fa-solid fa-volume-low"></i>
                ) : (
                  <i className="fa-solid fa-volume-xmark"></i>
                )}
              </button>
              <Volume
                percentage={volume}
                onChange={changeVolume}
                audio={audioRef.current}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


