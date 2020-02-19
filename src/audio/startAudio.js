// this is the master audio maker. Must only be triggered on a user event.
function startAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

  const mainGainNode = audioContext.createGain();
  mainGainNode.connect(audioContext.destination);
  mainGainNode.gain.value = 0.25;

  return { audioContext, mainGainNode }
}

export default startAudio