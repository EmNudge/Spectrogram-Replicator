import { remap } from '../utils'
import { get } from 'svelte/store';
import { minFreqStore, maxFreqStore, audioLengthStore } from '../stores/audio';

const VOLUME = 0.25;

// to both allow webkit and satsify TS, we need to extend the window object to support
// the "vendor prefixed" AudioContext in webkit. Wish this wasn't needed.
declare global {
  interface Window { 
    webkitAudioContext?: AudioContext; 
  }
}

class TonePlayer {
  audioContext: AudioContext | null = null;
  mainGainNode: GainNode | null = null;

  constructor(time = 3) {    
    audioLengthStore.set(time); // seconds. f64\
  }

  setupAudioContext() {
    this.audioContext = new AudioContext();

    this.mainGainNode = this.audioContext.createGain();
    this.mainGainNode.gain.value = VOLUME;
    this.mainGainNode.connect(this.audioContext.destination);
  }

  resume() {
    if (!this.audioContext) return;
    this.audioContext.resume()
  }
  pause() {
    if (!this.audioContext) return;
    this.audioContext.suspend();
  }

  mute() {
    if (!this.mainGainNode) return;
    this.mainGainNode.gain.value = 0;
  }
  unmute() {
    if (!this.mainGainNode) return;
    this.mainGainNode.gain.value = VOLUME;
  }

  play(schedules: Audio.Schedule[], startSkip: number) {
    this.setupAudioContext();

    for (const schedule of schedules) {
      this.playSchedule(schedule, startSkip);
    }
  }

  get percentage() {
    if (!this.audioContext) return 0;

    return this.audioContext.currentTime / get(audioLengthStore);
  }

  // gets value from 0 to 1 and gets the second time
  toTime(percentage: number) {
    if (!this.audioContext) return 0;

    return percentage * get(audioLengthStore) + this.audioContext.currentTime;
  }
  
  playSchedule(schedule: Audio.Schedule, startSkip: number) {
    if (!this.audioContext || !this.mainGainNode) return;

    if (schedule.length <= 1) return;

    const now = this.audioContext.currentTime;
  
    // need to make another gain node in order to "start" and "stop" without closing
    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.mainGainNode);
  
    // makes it hold at 0 until start
    gainNode.gain.setValueAtTime(0, now);
  
    // main oscilltor which produces the sound
    const oscillatorNode = this.audioContext.createOscillator();
    oscillatorNode.connect(gainNode);
    oscillatorNode.start(0);
  
    // we don't have to reference the previous time since, due to audio scheduling, 
    // since the next automation will only start after the previous finishes
    for (const { value, time, volume } of schedule) {
      gainNode.gain.linearRampToValueAtTime(volume, time - startSkip);

      oscillatorNode.frequency.linearRampToValueAtTime(value, time - startSkip);
    }
  }
}

export default TonePlayer