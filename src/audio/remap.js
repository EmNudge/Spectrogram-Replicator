function remap(val, min, max, min2, max2) {
  const basePercentage = (val - min) / (max - min);

  return basePercentage * (max2 - min2) + min2;
}

export default remap