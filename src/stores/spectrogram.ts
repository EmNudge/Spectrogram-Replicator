import { writable } from "svelte/store";
import { ColorMap } from '../spectrogram/generateImage';

type ValueOf<T> = T[keyof T];

export const specDataSt = writable<Uint8Array[]>([]);
export const colorMapSt = writable<ValueOf<typeof ColorMap>>(ColorMap.grayScale);
export const currentImageSt = writable<string>('');