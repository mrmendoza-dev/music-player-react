import React from "react";
import "./index.css";

function ControlPanel(props: any) {


  
  return (
    <div className="control-panel">
      <button
        id="shuffle"
        className="media-btn"
        onClick={props.toggleShuffle}
        style={props.shuffle ? { color: "var(--clr-accent)" } : {}}
      >
        <i
          className="fas fa-shuffle"
          title={props.shuffle ? "Disable shuffle" : "Enable shuffle"}
        ></i>
      </button>
      <button id="prev" className="media-btn" onClick={props.prevSong}>
        <i className="fas fa-backward" title="Previous"></i>
      </button>

      <button
        id="play"
        className="media-btn media-btn-big"
        onClick={props.playSong}
      >
        {props.isPlaying ? (
          <i className="fa-solid fa-circle-pause" title="Pause"></i>
        ) : (
          <i className="fa-solid fa-circle-play" title="Play"></i>
        )}
      </button>

      <button id="next" className="media-btn" onClick={props.nextSong}>
        <i className="fas fa-forward" title="Next"></i>
      </button>
      <button
        id="repeat"
        className="media-btn"
        onClick={props.toggleRepeat}
        style={props.repeat ? { color: "var(--clr-accent)" } : {}}
      >
        <i
          className="fas fa-repeat"
          title={props.repeat ? "Disable repeat" : "Enable repeat"}
        ></i>
      </button>
    </div>
  );
}
export default ControlPanel;
