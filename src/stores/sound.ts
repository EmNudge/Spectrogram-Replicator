import { derived, writable } from "svelte/store";

export const durationSt = writable(6);
export const currentTimePercSt = writable(.4);

// export const currentTimeSt = derived(
//     [durationSt, currentTimePercSt],
//     ([duration, currentTimePerc]) => duration * currentTimePerc
// );