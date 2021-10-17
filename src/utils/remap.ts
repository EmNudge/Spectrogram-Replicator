export const baseRemap = (val: number, min: number, max: number) =>
    (val - min) / (max - min);

export const remap = (val: number, min: number, max: number, min2: number, max2: number) =>
    baseRemap(val, min, max) * (max2 - min2) + min2;

export const ambigRemap = (val: number, range1: [number, number], range2: [number, number]) => {
    const [min1, max1] = range1[0] < range1[1] 
        ? range1 
        : [range1[1], range1[0]];
    const [min2, max2] = range2[0] < range2[1] 
        ? range2 
        : [range2[1], range2[0]];

    return remap(val, min1, max1, min2, max2);
}