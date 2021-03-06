// returns a number, ensuring it is between 2 other numbers
// if it isn't, the range end closest to it will be returned instead
export function clamp(val: number, min: number, max: number) {
  const rightEnd = Math.min(val, max);
  const leftEnd = Math.max(rightEnd, min);

  return leftEnd;
}
