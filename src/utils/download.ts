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

function copySvg(svgEl: SVGElement) {
    const str = new XMLSerializer().serializeToString(svgEl);
    const doc = new DOMParser().parseFromString(str, 'image/svg+xml');
    return doc.querySelector('svg');
}

export function inlineSvgStyles(svgEl: SVGElement) {
    const svgCopy = copySvg(svgEl)!;
    svgCopy.removeAttribute('class');

    document.body.appendChild(svgCopy);
    
    for (const node of svgCopy.querySelectorAll('*')) {
        if (!('style' in node)) continue;
        const el = node as HTMLElement;
        
        const styles = window.getComputedStyle(el);
        const names = ['strokeDasharray', 'stroke', 'strokeWidth', 'fill'];
        for (const styleName of names) {
            el.style[styleName] = styles[styleName];
        }
        el.removeAttribute('class');
    }

    document.body.removeChild(svgCopy);

    return svgCopy;
}
export async function downloadPNG(svgEl: SVGElement, name = 'chart.png') {
    const { width, height } = svgEl.getBoundingClientRect()
    const svgCopy = inlineSvgStyles(svgEl);
    Object.assign(svgCopy.style, { width, height });
    const url = getSvgUrl(svgCopy);

    const canvas = await getCanvasForUrl(url)
    
    downloadItem(canvas.toDataURL('image/png'), name);
}

export function downloadSVG(svgEl: SVGElement, name = 'chart.svg') {
    const url = getSvgUrl(inlineSvgStyles(svgEl));
    downloadItem(url, name);
}