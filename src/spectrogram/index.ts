import { getSpectrogram } from './functional_spec';

export function getWindow(sampleRate: number, windowDuration = 0.02) {
    const minBins = sampleRate * windowDuration;
    const nearestPowerOf2 = 2 ** Math.ceil(Math.log2(minBins));
    return nearestPowerOf2;
}

export async function getImageForAudio(buffer: AudioBuffer, windowSize?: number) {
    const bins = windowSize || getWindow(buffer.sampleRate);
    const signal = buffer.getChannelData(0);

    return getSpectrogram({ width: 600, height: 300, bins, signal });
}