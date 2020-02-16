export default function getDist({ x, y }, other) {
  const distX = x - other.x;
  const distY = y - other.y;
  return Math.sqrt(distX**2 + distY**2);
}