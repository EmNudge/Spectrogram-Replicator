// usually called "map", but remap makes more sense. 
// It maps one range onto another.
function remap(val: number, min: number, max: number, min2: number, max2: number) {
  const basePercentage = (val - min) / (max - min);

  return basePercentage * (max2 - min2) + min2;
}

export default remap;