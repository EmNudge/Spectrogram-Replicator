function playSchedule({ schedule, gainNode, oscillatorNode, audioContext }) {
  const startTime = schedule[0].time;
  const endTime = schedule[schedule.length - 1].time;
  const now = audioContext.currentTime;

  // makes it hold at 0 until start
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0, now + startTime);
  gainNode.gain.linearRampToValueAtTime(0.2, now + startTime);
  // hold and then go to 0
  gainNode.gain.linearRampToValueAtTime(0.2, now + endTime);
  gainNode.gain.linearRampToValueAtTime(0, now + endTime);

  // start at 0
  oscillatorNode.frequency.setValueAtTime(value, now);

  for (const event of schedule) {
    const { time, value } = event;

    oscillatorNode.frequency.linearRampToValueAtTime(value, time);
  }
}

export default playSchedule;
