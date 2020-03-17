import { remap } from '../utils'
import { get } from 'svelte/store';
import { minFreqStore, maxFreqStore, audioLengthStore } from '../stores/audio';
import { Schedule } from './getSchedule';

const VOLUME = 0.25;

class TonePlayer {
  audioContext: AudioContext | null = null;
  mainGainNode: GainNode | null = null;

  constructor(time = 3) {    
    audioLengthStore.set(time); // seconds. f64\
  }

  setupAudioContext() {
    this.audioContext = new window.AudioContext();

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

  play(schedules: Schedule[]) {
    this.setupAudioContext();

    for (const schedule of schedules) {
      this.playSchedule(schedule);
    }
  }

  get percentage() {
    if (!this.audioContext) return;

    return this.audioContext.currentTime / get(audioLengthStore);
  }

  // gets value from 0 to 1 and gets the second time
  toTime(percentage: number) {
    if (!this.audioContext) return 0;

    return percentage * get(audioLengthStore) + this.audioContext.currentTime;
  }
  
  playSchedule(schedule: Schedule) {
      if (!this.audioContext || !this.mainGainNode) return;

      if (schedule.length <= 1) return;

      const minFreq = get(minFreqStore);
      const maxFreq = get(maxFreqStore);

      const now = this.audioContext.currentTime;
    
      // need to make another gain node in order to "start" and "stop" without closing
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.mainGainNode);
    
      // makes it hold at 0 until start
      gainNode.gain.setValueAtTime(0, now);
    
      for (const [index, event] of schedule.entries()) {
        const { volume, timePerc } = event;
        const time = this.toTime(timePerc);

        if (volume !== 0) continue
        
        const prevEvent = schedule[index - 1];
        if (prevEvent && prevEvent.volume > 0) {
          gainNode.gain.linearRampToValueAtTime(0.2, time - .01);
          gainNode.gain.linearRampToValueAtTime(0, time);
        } else {
          gainNode.gain.linearRampToValueAtTime(0, time - .01);
          gainNode.gain.linearRampToValueAtTime(0.2, time);
        }
      }    
    
      // main oscilltor which produces the sound
      const oscillatorNode = this.audioContext.createOscillator();
      oscillatorNode.connect(gainNode);
      oscillatorNode.start(0);
    
      // we don't have to reference the previous time since, due to audio scheduling, 
      // since the next automation will only start after the previous finishes
      for (const event of schedule) {
        const value = Math.floor(remap(event.value, 0, 1, minFreq, maxFreq));
        const time = this.toTime(event.timePerc);

        oscillatorNode.frequency.linearRampToValueAtTime(value, time);
      }    
  }
}

export default TonePlayer