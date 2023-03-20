import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { icons } from "./assets/icons";
import ControlPanel from "./components/controls/ControlPanel";
import Slider from "./components/slider/Slider";
import Volume from "./components/Volume/Volume";
import "./css/App.scss";
import { songData } from "./songData";

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
    let favoritesList = favorites.splice(0);
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
      setLastVolume(volume);
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
    <div className="App">
      <div className="song-img-block">
        <img
          className="song-img"
          src={currentSong.img}
          alt="music-cover"
          id="cover"
        />
      </div>

      <div className="song-info">
        <div className="song-main">
          <p className="song-name">{currentSong.name}</p>
          <p className="song-artist">{currentSong.artist}</p>
        </div>
        <button
          className="heart-btn"
          onClick={() => {
            addToFavorites(currentSong.id);
          }}
        >
          {favorites.includes(currentSong.id) ? (
            <FontAwesomeIcon
              icon={icons.faHeartFilled}
              title="Remove from Your Library"
              className="highlighted"
            />
          ) : (
            <FontAwesomeIcon
              icon={icons.faHeartEmpty}
              title="Save to Your Library"
            />
          )}
        </button>
      </div>

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
      <div className="song-footer">
        <div className="volume-control">
          <button className="mute-btn" onClick={muteVolume}>
            {volume >= 50 ? (
              <FontAwesomeIcon icon={icons.faVolumeHigh} />
            ) : volume > 0 ? (
              <FontAwesomeIcon icon={icons.faVolumeLow} />
            ) : (
              <FontAwesomeIcon icon={icons.faVolumeXmark} title="Unmute" />
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
  );
}
