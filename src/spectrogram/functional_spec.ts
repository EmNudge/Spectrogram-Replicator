import FFT from 'fft.js';
import { get } from 'svelte/store';
import { cappedDBSt, colorMapSt } from '../stores/spectrogram';

export const hannWindow = (n: number, length: number) =>
    0.5 * (1.0 - Math.cos((2.0 * Math.PI * n) / (length - 1.0)));

interface SpecSettings {
    width: number;
    height: number;
    bins: number;
    signal: Float32Array;
}

export function getSpectrogram({ width, height, bins, signal }: SpecSettings) {
    const windowArr = new Float32Array(bins).map((_, i) => hannWindow(i, bins * 2));

    const plotter = getPlotter(width, height);

    const fft = new FFT(bins);
    const complexArr = fft.createComplexArray() as unknown as Float32Array;
    const colorMap = get(colorMapSt);

    for (let x = 0; x < width; x++) {
        const chunk = getChunk(signal, x/width, bins, windowArr);
        const frequencies = getFrequencies(fft, complexArr, chunk);
        for (let y = 0; y < height; y++) {
            const index = Math.floor(y/height * frequencies.length);
            const strength = frequencies[index];
            if (Number.isNaN(strength)) continue;

            plotter.point(x, height - y, colorMap(strength));
        }
    }

    return plotter.getUrl();
}

const getChunk = (signal: Float32Array, percentage: number, bins: number, windowArr: Float32Array) => {
    const mid = Math.floor(percentage * signal.length);
    const start = Math.max(mid - Math.floor(bins/2), 0);
    const end = Math.min(mid + Math.ceil(bins/2), signal.length);

    const chunk = new Float32Array(end - start)
        .map((_, i) => signal[start + i] * windowArr[i]);
    return chunk;
}

const getPlotter = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    const imageData = ctx.createImageData(width, height);
    const { data } = imageData;

    type Color = [number, number, number] | [number, number, number, number];
    return {
        point(x: number, y: number, color: Color) {
            const startIndex = (width * 4) * y + (x * 4);
            data[startIndex] = color[0];
            data[startIndex + 1] = color[1];
            data[startIndex + 2] = color[2];
            data[startIndex + 3] = color[3] ?? 1;
        },
        getUrl: () => {
            ctx.putImageData(imageData, 0, 0);
            return canvas.toDataURL()
        }
    }
}

function getFrequencies(fftInstance: FFT, complexArr: Float32Array, chunk: Float32Array) {
    fftInstance.realTransform(complexArr, chunk);
    // complexArr length is 2 * bins
    const bins = chunk.length;
    const magnitudes = new Float32Array(bins/2).map((_, i) => {
        const j = i * 2;
        const realNum = complexArr[j];
        const imagNum = complexArr[j + 1];
        const magnitude = Math.sqrt(realNum ** 2 + imagNum ** 2);
        return magnitude;
    });

    // normalize
    const maxNum = Math.max(...magnitudes);
    for (let i = 0; i < magnitudes.length; i++) {
        magnitudes[i] /= maxNum;
    }

    const cappedDB = get(cappedDBSt);
    for (let i = 0; i < magnitudes.length; i++) {
        // general dB conversion
        const value = 20 * Math.log10(magnitudes[i]);
        // cap at some value and flip it so it now goes from 0->1
        const dB = 1 - Math.max(value,  cappedDB) / cappedDB;
        magnitudes[i] = dB;
    }
    return magnitudes
}