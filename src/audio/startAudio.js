function startAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);

  const oscillator = audioCtx.createOscillator()
  oscillator.connect(gainNode)

  return { audioCtx, gainNode, oscillator }
}

export default startAudio