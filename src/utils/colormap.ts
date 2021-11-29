export type Color = [number, number, number, number];

const interpolate = (percentage: number, color1: Color, color2: Color): Color => 
    color1.map((n, i) => (color2[i] - n) * percentage + n) as Color;

const interMult = (percentage: number, ...colors: Color[]): Color => {
    const baseIndex = (colors.length - 1) * percentage;
    if (baseIndex === Math.floor(baseIndex)) return colors[baseIndex];
    
    const prevIndex = Math.max(Math.floor(baseIndex), 0);
    const nextIndex = Math.min(prevIndex + 1, colors.length - 1);
    
    const ratio = 1 / (colors.length - 1);
    const mappedPerc = (percentage - ratio * prevIndex) / (ratio * nextIndex); 
    
    return interpolate(mappedPerc, colors[prevIndex], colors[nextIndex]);
}

export const mapHot = (percentage: number, transparent?: boolean) => {
    const black = [0, 0, 0, transparent ? 0 : 255] as Color;
    const purple = [100, 19, 200, 255] as Color;
    const red = [225, 16, 0, 255] as Color;
    const yellow = [255, 215, 25, 255] as Color;
    const white = [255, 255, 255, 255] as Color;
    
    return interMult(percentage, black, purple, red, yellow, white);
}

export const mapGrayscale = (percentage: number, transparent?: boolean) => {
    const white = [255, 255, 255, transparent ? 0 : 255] as Color;
    const black = Array(4).fill(255) as Color;

    return interpolate(percentage, white, black);
}