import {remap} from "./index";

// takes keyframes and some options. Spits out (time,value) instead of (x,y)
function getSchedule({
  keyframes,
  width,
  height,
  milliseconds,
  minVal,
  maxVal
}) {
  return keyframes.map(keyframe => {
    const xPerc = keyframe.x / width;
    const yPerc = keyframe.y / height;

    const time = xPerc * milliseconds;
    const value = remap(yPerc, 0, 1, minVal, maxVal);

    return { time, value };
  });
}

export default getSchedule;