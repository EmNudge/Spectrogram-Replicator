import { remap } from "../utils";

// takes keyframes and some options. Spits out (time,value) instead of (x,y)
function getSchedule({
  nodes,
  width,
  height,
  minVal,
  maxVal
}) {
  return nodes.map(node => {
    const xPerc = node.x / width;
    // invert it since y starts from top
    const yPerc = 1 - node.y / height;

    const time = xPerc;
    const value = remap(yPerc, 0, 1, minVal, maxVal);

    return { time, value };
  });
}

export default getSchedule;
