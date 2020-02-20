const VOLUME = 0.25;

// represented in ms
// web audio uses seconds and floats
const RUN_TIME = 3000;

class TonePlayer {
  constructor() {
    this.schedules = []
    this.start()
  }

  start() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    this.mainGainNode = this.audioContext.createGain();
    this.mainGainNode.gain.value = VOLUME;
    this.mainGainNode.connect(this.audioContext.destination);

    this.play();
  }

  resume() {
    this.audioContext.resume()
  }
  pause() {
    this.audioContext.suspend();
  }

  mute() {
    this.mainGainNode.gain.value = 0;
  }
  unmute() {
    this.mainGainNode.gain.value = VOLUME;
  }

  play() {
    debugger;
    for (const schedule of this.schedules) {
      this.playSchedule(schedule);
    }
  }

  get percentage() {
    return (this.audioContext.currentTime * 1000) / RUN_TIME;
  }
  
  playSchedule(schedule) {
      // setting up some values for easier reference
      const startTime = schedule[0].time / 1000;
      const endTime = schedule[schedule.length - 1].time / 1000;
      const now = this.audioContext.currentTime;
    
    
      // need to make another gain node in order to "start" and "stop" without closing
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.mainGainNode);
    
      // makes it hold at 0 until start
      gainNode.gain.setValueAtTime(0, now);
    
      // hold to 0 and then jump to .2
      gainNode.gain.linearRampToValueAtTime(0, now + startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, now + startTime + .1);
      // hold at .2 and then jump to 0
      gainNode.gain.linearRampToValueAtTime(0.2, now + endTime);
      gainNode.gain.linearRampToValueAtTime(0, now + endTime + .1);
    
    
      // main oscilltor which produces the sound
      const oscillatorNode = this.audioContext.createOscillator();
      oscillatorNode.connect(gainNode);
      oscillatorNode.start(0);
    
      // we don't have to reference the previous time since, due to audio scheduling, 
      // since the next automation will only start after the previous finishes
      for (const event of schedule) {
        const value = Math.floor(event.value);
        const time = (event.time / 1000) + now;
    
        oscillatorNode.frequency.linearRampToValueAtTime(value, time);
      }    
  }
}

export default TonePlayer