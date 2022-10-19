import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./slider.css";

function Slider(props: any) {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef: any = useRef();
  const thumbRef: any = useRef();



  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * props.percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * props.percentage -
      (thumbWidth / 100) * props.percentage;
    setPosition(props.percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [props.percentage]);

  return (
    <div className="slider-container">
      <div
        className="progress-bar-cover"
        style={{
          width: `${progressBarWidth}px`,
        }}
      ></div>
      <div
        className="thumb"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></div>
      <input
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        className="range"
        onChange={props.onChange}
      />
    </div>
  );
}

export default Slider;
