import { readable } from 'svelte/store';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
export const audioContextStore = readable(audioContext);


const mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = 0.25;
export const mainGainNodeStore = readable(mainGainNode);
