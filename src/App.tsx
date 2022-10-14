import { useState, useEffect } from 'react'
import './css/App.css'
import { songData } from "./songData";



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




  return (
    <div className="App">
      <div className="music-container" id="music-container">
        <div className="music-info">
          <h4 id="title"></h4>

          <div className="">
            <p className="song-name">
              {songIndex + 1} / {songs.length}
            </p>
            <p className="song-name">{currentSong.name}</p>
            <p className="song-name">{currentSong.artist}</p>
            <p className="song-name">{currentSong.album}</p>
            <p className="song-name">{currentSong.year}</p>
          </div>

          <div className="progress-container" id="progress-container">
            <div className="progress" id="progress"></div>
            <p className="progress-text" id="progressText">
              Time
            </p>
          </div>
        </div>

        <audio src={currentSong.mp3}></audio>

        <div className="img-container">
          <img src={currentSong.img} alt="music-cover" id="cover" />
        </div>

        <div className="navigation">
          <button
            id="shuffle"
            className="action-btn"
            onClick={toggleShuffle}
            style={shuffle ? { color: "cyan" } : { color: "#dfdbdf" }}
          >
            <i className="fas fa-shuffle"></i>
          </button>
          <button id="prev" className="action-btn" onClick={prevSong}>
            <i className="fas fa-backward"></i>
          </button>
          <button id="play" className="action-btn action-btn-big">
            <i className="fas fa-play"></i>
          </button>
          <button id="next" className="action-btn" onClick={nextSong}>
            <i className="fas fa-forward"></i>
          </button>
          <button
            id="repeat"
            className="action-btn"
            onClick={toggleRepeat}
            style={repeat ? { color: "cyan" } : { color: "#dfdbdf" }}
          >
            <i className="fas fa-repeat"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
