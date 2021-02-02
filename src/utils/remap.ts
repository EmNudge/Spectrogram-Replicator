// usually called "map", but remap makes more sense. 
// It maps one range onto another.
export function remap(val: number, min: number, max: number, min2: number, max2: number) {
  const basePercentage = (val - min) / (max - min);

  return basePercentage * (max2 - min2) + min2;
}