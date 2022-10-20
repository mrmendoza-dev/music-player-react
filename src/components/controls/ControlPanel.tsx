import React from "react";
import "./control-panel.css";

function ControlPanel(props: any) {


  
  return (
    <div className="control-panel">
      <button
        id="shuffle"
        className="media-btn"
        onClick={props.toggleShuffle}
        style={
          props.shuffle
            ? { color: "var(--clr-accent)" }
            : { color: "var(--clr-btn)" }
        }
      >
        <i className="fas fa-shuffle"></i>
      </button>
      <button id="prev" className="media-btn" onClick={props.prevSong}>
        <i className="fas fa-backward"></i>
      </button>

      <button
        id="play"
        className="media-btn media-btn-big"
        onClick={props.playSong}
      >
        {props.isPlaying ? (
          <i className="fa-solid fa-circle-pause"></i>
        ) : (
          <i className="fa-solid fa-circle-play"></i>
        )}
      </button>

      <button id="next" className="media-btn" onClick={props.nextSong}>
        <i className="fas fa-forward"></i>
      </button>
      <button
        id="repeat"
        className="media-btn"
        onClick={props.toggleRepeat}
        style={
          props.repeat
            ? { color: "var(--clr-accent)" }
            : { color: "var(--clr-btn)" }
        }
      >
        <i className="fas fa-repeat"></i>
      </button>
    </div>
  );
}
export default ControlPanel;
