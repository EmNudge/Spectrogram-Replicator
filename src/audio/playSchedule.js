function playSchedule({ schedule, mainGainNode, audioContext }) {
  // setting up some values for easier reference
  const startTime = schedule[0].time / 1000;
  const endTime = schedule[schedule.length - 1].time / 1000;
  const now = audioContext.currentTime;


  // need to make another gain node in order to "start" and "stop" without closing
  const gainNode = audioContext.createGain();
  gainNode.connect(mainGainNode);

  // makes it hold at 0 until start
  gainNode.gain.setValueAtTime(0, now);

  // hold to 0 and then jump to .2
  gainNode.gain.linearRampToValueAtTime(0, now + startTime);
  gainNode.gain.linearRampToValueAtTime(0.2, now + startTime + .1);
  // hold at .2 and then jump to 0
  gainNode.gain.linearRampToValueAtTime(0.2, now + endTime);
  gainNode.gain.linearRampToValueAtTime(0, now + endTime + .1);


  // main oscilltor which produces the sound
  const oscillatorNode = audioContext.createOscillator();
  oscillatorNode.connect(gainNode);
  oscillatorNode.start(0);

  // we don't have to reference the previous time since, due to audio scheduling, 
  // since the next automation will only start after the previous finishes
  for (const event of schedule) {
    const value = Math.floor(event.value);
    const time = (event.time / 1000) + now;
  
    console.log({ time, value })

    oscillatorNode.frequency.linearRampToValueAtTime(value, time);
  }

 
}

export default playSchedule;
