import { useState, useEffect, useRef } from "react";
import './css/App.css'
import { songData } from "./songData";
import Slider from "./components/slider/Slider";
import ControlPanel from "./components/controls/ControlPanel";


function App() {
  const [songs, setSongs] = useState(songData);
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  
  useEffect(() => {
    setSongs(songData);
  }, []);

  useEffect(() => {
    setCurrentSong(songs[songIndex]);
  }, [songIndex]);


  function randomSong() {
    let randomIndex = Math.floor(Math.random() * songs.length);
    setSongIndex(randomIndex);
  }

  function nextSong() {
    if (shuffle) {
      randomSong();
      return;
    }

    if (songIndex === songs.length - 1) {
      setSongIndex(0);
    } else {
      setSongIndex((prevIndex) => prevIndex + 1);
    }
  }

  function prevSong() {
    if (shuffle) {
      randomSong();
      return;
    }

    if (songIndex === 0) {
      setSongIndex(songs.length - 1);
    } else {
      setSongIndex((prevIndex) => prevIndex - 1);
    }
  }

  function toggleShuffle() {
    setShuffle((prevFlag) => !prevFlag);
  }

  function toggleRepeat() {
    setRepeat((prevFlag) => !prevFlag);
  }



  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<any>(null);

  const onChange = (e: any) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.5;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

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
        <button className="heart-btn">
          <i className="fa-regular fa-heart"></i>
          {/* <i className="fa-solid fa-heart"></i> */}
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
          src={currentSong.mp3}
        ></audio>
      </div>

      <div className="song-controls">
        <ControlPanel
          play={play}
          isPlaying={isPlaying}
          duration={duration}
          currentTime={currentTime}
          nextSong={nextSong}
          prevSong={prevSong}
          randomSong={randomSong}
          toggleShuffle={toggleShuffle}
          toggleRepeat={toggleRepeat}
          shuffle={shuffle}
          repeat={repeat}
        />
      </div>
    </div>
  );
}

export default App
