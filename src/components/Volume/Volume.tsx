import { useState, useRef, useEffect } from "react";
import "./volume.css";

export default function Volume(props: any) {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const volumeRangeRef: any = useRef();
  const volumeThumbRef: any = useRef();

  useEffect(() => {
    const rangeWidth = volumeRangeRef.current.getBoundingClientRect().width;
    const thumbWidth = volumeThumbRef.current.getBoundingClientRect().width;
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
    <div className="volume-container">
      <div
        className="progress-bar-cover"
        style={{
          width: `${progressBarWidth}px`,
        }}
      ></div>
      <div
        className="thumb"
        ref={volumeThumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></div>
      <input
        type="range"
        value={position}
        ref={volumeRangeRef}
        // step="0.01"
        className="range"
        onChange={props.onChange}
      />
    </div>
  );
}

