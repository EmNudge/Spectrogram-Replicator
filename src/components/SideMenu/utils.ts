import { get } from "svelte/store";
import { linesSt } from "$stores/canvas";
import { authorSt, graphElSt, titleSt } from "$stores/project";
import { durationSt } from "$stores/sound";
import { specOpacitySt } from "$stores/spectrogram";
import { downloadItem, downloadPNG, downloadSVG } from "$utils/download";
import { canvasWidthSt, columnsSt, lightenOddRowsSt, maxFreqSt, minFreqSt, rowsSt, showGridst } from "$stores/graph";

import type { Line, Segment } from "$stores/canvas";

function getLines() {
    const realLines = get(linesSt).filter(line => 'boundsSt' in line) as Line[];
    return realLines.map(({ boundsSt, colorSt, segmentsSt }) => {
        const bounds = get(boundsSt);
        const color = get(colorSt);

        const realSegments = get(segmentsSt).filter(segment => 'boundsSt' in segment) as Segment[];
        const segments = realSegments.map(({ boundsSt, pointsSt }) => {
            const bounds = get(boundsSt);
            const points = get(pointsSt).map(({ x, y }) => ({ x, y }));

            return { bounds, points };
        });

        return { bounds, color, segments };
    })
}

function getProjectSettings() {
    const author = get(authorSt);
    const title = get(titleSt);

    const duration = get(durationSt);
    const specOpacity = get(specOpacitySt);

    const lines = getLines();
    const freqBounds = [get(minFreqSt), get(maxFreqSt)] as const;

    const rows = get(rowsSt)
    const columns = get(columnsSt);
    const canvasWidth = get(canvasWidthSt);
    const showGrid = get(showGridst)
    const lightenOddRows = get(lightenOddRowsSt);

    return {
        author, title, duration, specOpacity,
        freqBounds, rows, columns, canvasWidth,
        showGrid, lightenOddRows, lines
    };
}

export function downloadChart(chartType: string) {
    const graphEl = get(graphElSt);
    if (!graphEl) return;

    const downloadFunc = chartType === 'SVG' ? downloadSVG : downloadPNG;
    downloadFunc(graphEl);
}

export function downloadProjectSettings() {
    const settings = getProjectSettings();
    const blob = new Blob([JSON.stringify(settings)], { type: 'text/json' });
    const url = URL.createObjectURL(blob);

    downloadItem(url, 'project.json');
}