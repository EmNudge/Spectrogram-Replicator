export function downloadItem(url: string, fileName: string) {
	const a = document.createElement('a');
	a.setAttribute('href', url);
	a.setAttribute('download', fileName);
	a.click();
}
function getSvgUrl(svgEl: SVGElement) {
    const xml = new XMLSerializer().serializeToString(svgEl);
    return URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml' }));
}

const onEvent = (el: Node, name: string) => new Promise(res => {
    el.addEventListener(name, res, { once: true });
});

async function getCanvasForUrl(url: string) {
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);

    await onEvent(img, 'load');

    const canvas = document.createElement('canvas');
    const { width, height } = window.getComputedStyle(img);
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    document.body.removeChild(img);

    return canvas;
}

export async function downloadPNG(svgEl: SVGElement, name = 'chart.png') {
    const url = getSvgUrl(svgEl);

    const canvas = await getCanvasForUrl(url)
    
    downloadItem(canvas.toDataURL('image/png'), 'syntax-tree.png');
}

export function downloadSVG(svgEl: SVGElement, name = 'chart.svg') {
    downloadItem(getSvgUrl(svgEl), name);
}