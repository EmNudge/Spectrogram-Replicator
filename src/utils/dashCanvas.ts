// this might belong in src/canvas, but idk
// this takes a canvas element and turns it into a dashed BG
interface Pos {
  x: number,
  y: number,
}

export default function dashCanvas(canvas: HTMLCanvasElement, xSections: number, ySections: number, opacity: number = .5) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const width = canvas.width;
  const height = canvas.width;
  
  function addLine(from: Pos, to: Pos, dashes = [10, 10]) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
    ctx.setLineDash(dashes);
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  const xSectionWidth = width / xSections;
  for (let i = 1; i < xSections; i++) {
    const x = xSectionWidth * i;
    addLine({ x, y: 0 }, { x, y: height });
  }

  const ySectionHeight = height / ySections;
  for (let i = 1; i < ySections; i++) {
    const y = ySectionHeight * i;
    addLine({ x: 0, y }, { x: width, y });
    // making every other one darker
    if (i % 2 == 1) continue;
    addLine({ x: 0, y }, { x: width, y });
  }
}