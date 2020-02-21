const VOLUME = 0.25;

class TonePlayer {
  constructor(time = 3000) {
    this.schedules = [];
    
    // represented in ms
    // web audio uses seconds and floats
    this.runTime = time;
    
    this.start();
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
    for (const schedule of this.schedules) {
      this.playSchedule(schedule);
    }
  }

  get percentage() {
    return (this.audioContext.currentTime * 1000) / this.runTime;
  }

  // gets value from 0 to 1 and gets the second time
  toTime(percentage) {
    return percentage * this.runTime / 1000 + this.audioContext.currentTime;
  }
  
  playSchedule(schedule) {
      if (!schedule.length) return;
      
      // setting up some values for easier reference
      const startTime = this.toTime(schedule[0].time);
      const endTime = this.toTime(schedule[schedule.length - 1].time);
      const now = this.audioContext.currentTime;
    
    
      // need to make another gain node in order to "start" and "stop" without closing
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.mainGainNode);
    
      // makes it hold at 0 until start
      gainNode.gain.setValueAtTime(0, now);
    
      // hold to 0 and then jump to .2
      gainNode.gain.linearRampToValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + .1);
      // hold at .2 and then jump to 0
      gainNode.gain.linearRampToValueAtTime(0.2, endTime);
      gainNode.gain.linearRampToValueAtTime(0, endTime + .1);
    
    
      // main oscilltor which produces the sound
      const oscillatorNode = this.audioContext.createOscillator();
      oscillatorNode.connect(gainNode);
      oscillatorNode.start(0);
    
      // we don't have to reference the previous time since, due to audio scheduling, 
      // since the next automation will only start after the previous finishes
      for (const event of schedule) {
        const value = Math.floor(event.value);
        const time = this.toTime(event.time);
    
        oscillatorNode.frequency.linearRampToValueAtTime(value, time);
      }    
  }
}

export default TonePlayer