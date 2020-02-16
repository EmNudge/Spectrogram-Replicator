import { getDist, LINE_WIDTH, KEYFRAME_SIZE } from './index'

// draws keyframes and connecting lines. Assumes keyframes are ordered
export default function drawKeyframes({ ctx, hue, keyframes, selectedId, mousePos, active }) {

  const keyframeColor = `hsl(${hue}, 50%, ${active ? 50 : 60}%)`;
  const HoverKeyframeColor = `hsl(${hue}, 50%, 60%)`;
  const lineColor = `hsl(${hue}, 50%, ${active ? 70 : 80}%)`;

  // draw lines
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = LINE_WIDTH;

  for (let i = 1; i < keyframes.length; i++) {
    const pos = keyframes[i];
    const prevPos = keyframes[i - 1];

    ctx.beginPath();
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.lineWidth = LINE_WIDTH;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  // draw keyframes
  for (const keyframe of keyframes) {
    const isHovering = getDist(mousePos, keyframe) < KEYFRAME_SIZE;
    const isSelected = keyframe.id === selectedId;
  
    ctx.beginPath();
    ctx.fillStyle = isHovering ? HoverKeyframeColor : keyframeColor;
    ctx.arc(keyframe.x, keyframe.y, KEYFRAME_SIZE, 0, 2 * Math.PI);
    ctx.fill();
  
    ctx.beginPath();
    ctx.fillStyle = isSelected ? "black" : "white";
    ctx.arc(keyframe.x, keyframe.y, KEYFRAME_SIZE/2, 0, 2 * Math.PI);
    ctx.fill();
  }
}
