import { linesSt } from "$stores/canvas";
import { currentTimePercSt } from "$stores/sound";
import { get } from "svelte/store";
import { playLine } from "./playLine";

const GLOBAL_VOLUME = .2;

const nodeGetter = (audioContext: AudioContext, gainNode: GainNode) => () => {
    const segmentGainNode = audioContext.createGain();
    segmentGainNode.connect(gainNode);
    segmentGainNode.gain.value = 0;

    const oscillatorNode = audioContext.createOscillator();
    oscillatorNode.connect(segmentGainNode);
    oscillatorNode.start(0);

    return [segmentGainNode, oscillatorNode] as [GainNode, OscillatorNode];
}

export function playLines() {
    const audioContext = new AudioContext();

    const gainNode = audioContext.createGain();
    gainNode.gain.value = GLOBAL_VOLUME;
    gainNode.connect(audioContext.destination);

    const lines = get(linesSt);
    const currentTime = get(currentTimePercSt);

    const getNodes = nodeGetter(audioContext, gainNode);
    const now = audioContext.currentTime;

    for (const line of lines) {
        if (!('segmentsSt' in line)) continue;
        playLine(line, currentTime, now, getNodes);
    }

    return {
        stop() {
            audioContext.close();
        },
    }
}