export const ColorMap = {
    hueGreen: (strength: number) => `hsla(${strength * 200 + 160}, 50%, 50%, ${strength})`,
    grayScale: (strength: number) => `hsla(0, 0%, ${100-strength*100}%, ${strength})`,
}
export const colorMaps = Object.entries(ColorMap);

export function drawAudio(canvas: HTMLCanvasElement, data: Uint8Array[], colorMap = ColorMap.hueGreen) {
    const width = canvas.width;
    const height = canvas.height;
  
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
  
    let x = 0;
    const barHeight = height / 128;
    const barWidth = width / data.length;
  
    for (const dataArray of data) {
        let y = 0;
        for (const num of dataArray) {
            ctx.fillStyle = colorMap(num / 128);
            ctx.fillRect(x, height - y, barWidth + 2, barHeight + 2);

            y += barHeight;
        }
  
        x += barWidth;
    }
}

export function getCanvasFromData(data: Uint8Array[], colorMap = ColorMap.hueGreen) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    drawAudio(canvas, data, colorMap);

    return canvas;
}