import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { icons } from "../../assets/icons";
import { songData } from "../../songData";
import Volume from "../Volume/Volume";
import useLocalStorage from "../hooks/useLocalStorage";
import Slider from "../slider/Slider";
import "./MusicPlayer.scss";

export default function MusicPlayer() {
  const [songs, setSongs] = useState(songData);
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("favoriteSongs", []);

  const [volume, setVolume] = useState(50);
  const [lastVolume, setLastVolume] = useState(50);

  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<any>(null);

  const [playlists, setPlaylists] = useState([
    "Trending",
    "New Releases",
    "Eighties Playlist",
  ]);

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

  function createPlaylist() {
    let newPlaylist = "New Playlist";
    setPlaylists([...playlists, newPlaylist]);
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

  function selectSong(index: number) {
    setSongIndex(index);
  }
  return (
    <div className="MusicPlayer">
      <div className="PlayerSidebar">
        <div className="player-sidebar-dir">
          <div className="player-sidebar-tab">
            <FontAwesomeIcon icon={icons.faEllipsis} id="more-icon" />
          </div>
          <button className="player-sidebar-tab">
            <FontAwesomeIcon icon={icons.faHouse} />
            <p>Home</p>
          </button>
          <button className="player-sidebar-tab">
            <FontAwesomeIcon icon={icons.faMagnifyingGlass} />
            <p>Search</p>
          </button>
          <button className="player-sidebar-tab">
            <FontAwesomeIcon icon={icons.faBookOpen} />
            <p>Your Library</p>
          </button>

          <hr className="hidden" />

          <button className="player-sidebar-tab" onClick={createPlaylist}>
            <FontAwesomeIcon icon={icons.faSquarePlus} />

            <p>Create Playlist</p>
          </button>

          <button className="player-sidebar-tab">
            <FontAwesomeIcon icon={icons.faHeartFilled} />

            <p>Liked Songs</p>
          </button>

          <hr className="hr-border"></hr>
          <div className="player-sidebar-playlists">
            {playlists.map((playlist) => {
              return <p className="player-playlist">{playlist}</p>;
            })}
          </div>
        </div>

        <div className="player-sidebar-img-block">
          <img
            className="player-sidebar-img"
            src={currentSong.img}
            alt="music-cover"
            id="cover"
          />
        </div>
      </div>

      <div className="PlayerMain">
        <div className="player-list-header">
          <div className="">
            <button
              id="play"
              className="player-header-play-btn"
              onClick={playSong}
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={icons.faCirclePause} title="Pause" />
              ) : (
                <FontAwesomeIcon icon={icons.faCirclePlay} title="Play" />
              )}
            </button>
          </div>
          <div className="">
            <button className="player-header-search-btn">
              <FontAwesomeIcon icon={icons.faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <div className="player-table-wrapper">
          <table className="player-table">
            <thead className="player-table-head">
              <tr>
                <td className="left">#</td>
                <td className="left">
                  <p>Title</p>
                </td>
                <td className="left">
                  <p>Album</p>
                </td>
                <td className="right">
                  <FontAwesomeIcon icon={icons.faClock} title="duration" />
                </td>
              </tr>
              <div className="thead-spacer"></div>
            </thead>
            <div className="tbody-spacer"></div>

            <tbody>
              {songs.map((song, index) => {
                return (
                  <tr
                    className="player-table-row"
                    onDoubleClick={() => {
                      selectSong(index);
                    }}
                  >
                    <td className="test">
                      {song.name === currentSong.name && (
                        <div className="highlighted"></div>
                      )}
                      <p className="player-table-num highlight">{index + 1}</p>
                    </td>

                    <td className="player-table-song">
                      <img src={song.img} className="player-table-img" />

                      <div className="player-table-song-info">
                        <div className="player-table-song-name">
                          {song.name === currentSong.name && (
                            <div className="highlighted"></div>
                          )}
                          <p className="highlight">{song.name}</p>
                        </div>

                        <p className="player-table-song-artist media-link song-hover">
                          {song.artist}
                        </p>
                      </div>
                    </td>

                    <td>
                      <p className="media-link song-hover">{song.album}</p>
                    </td>

                    <td className="player-table-dur">
                      <div className="flex-c">
                        {favorites.includes(song.id) ? (
                          <HeartSong
                            addToFavorites={addToFavorites}
                            currentSong={song}
                            favorites={favorites}
                          />
                        ) : (
                          <HeartSong
                            addToFavorites={addToFavorites}
                            currentSong={song}
                            favorites={favorites}
                            className="hidden"
                          />
                        )}
                      </div>

                      <p className="flex-c">1:26</p>
                      <FontAwesomeIcon
                        icon={icons.faEllipsis}
                        className="song-more-btn hidden flex-c"
                        title={`More options for ${song.name} by ${song.artist}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="PlayerFooter">
        <div className="PlayerFooter-song">
          <div className="">
            <p className="player-song-name media-link">{currentSong.name}</p>
            <p className="player-song-artist media-link">
              {currentSong.artist}
            </p>
          </div>
          <HeartSong
            addToFavorites={addToFavorites}
            currentSong={currentSong}
            favorites={favorites}
          />
        </div>
        <div className="PlayerFooter-main">
          <div className="player-control-panel">
            <button
              id="shuffle"
              className="media-btn"
              onClick={toggleShuffle}
              style={shuffle ? { color: "$clr-accent" } : {}}
              title={shuffle ? "Disable shuffle" : "Enable shuffle"}
            >
              <FontAwesomeIcon icon={icons.faShuffle} />
            </button>
            <button
              id="prev"
              className="media-btn"
              onClick={prevSong}
              title="Previous"
            >
              <FontAwesomeIcon icon={icons.faBackward} />
            </button>

            <button
              id="play"
              className="media-btn media-btn-big"
              onClick={playSong}
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={icons.faCirclePause} title="Pause" />
              ) : (
                <FontAwesomeIcon icon={icons.faCirclePlay} title="Play" />
              )}
            </button>

            <button
              id="next"
              className="media-btn"
              onClick={nextSong}
              title="Next"
            >
              <FontAwesomeIcon icon={icons.faForward} />
            </button>
            <button
              id="repeat"
              className="media-btn"
              onClick={toggleRepeat}
              style={repeat ? { color: "$clr-accent" } : {}}
              title={repeat ? "Disable repeat" : "Enable repeat"}
            >
              <FontAwesomeIcon icon={icons.faRepeat} />
            </button>
          </div>

          <div className="player-song-time">
            <div className="player-times">
              <div className="player-time">{secondsToHms(currentTime)}</div>
              <Slider
                percentage={percentage}
                onChange={onChange}
                className="player-time-bar"
              />
              <div className="player-time">{secondsToHms(duration)}</div>
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
        <div className="PlayerFooter-sub">
          <div className="volume-control">
            <button className="mute-btn" onClick={muteVolume} title="Mute">
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
              className="player-volume-bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartSong(props: any) {
  return (
    <div className={props.className}>
      <button
        className="heart-btn"
        onClick={() => {
          props.addToFavorites(props.currentSong.id);
        }}
      >
        {props.favorites.includes(props.currentSong.id) ? (
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
  );
}
