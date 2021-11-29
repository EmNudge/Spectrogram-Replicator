import { writable } from "svelte/store";
import { mapHot } from '../utils/colormap';
import type { ColorMap } from '../utils/colormap';

export const specDataSt = writable<string>('');
export const colorMapSt = writable<ColorMap>(mapHot);

export const acceptableBinNums = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192] as const;
type BinNum = typeof acceptableBinNums[number];
export const binsSt = writable<BinNum>(128);

export const cappedDBSt = writable<number>(-30);

export const currentImageSt = writable<string>('');
export const bufferSt = writable<AudioBuffer|undefined>();

export const specOpacitySt = writable(0.8);