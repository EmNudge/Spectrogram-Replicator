<script>
  import AudioPlayer from './audioPlayer.svelte'
  import { getSchedule, playSchedule } from '../audio'
  import { lines, canvasStore } from '../stores/canvas'
  import { audioContextStore, mainGainNodeStore } from '../stores/audio'

  // 3 seconds
  const TOTAL_TIME = 3000;

  let audioContext;
  
  let timePerc = 0;
  let reqId;
  let startTime;

  function play() {
    const audioContext = $audioContextStore;
    
    if (audioContext.state == 'suspended') {
      audioContext.resume();
    }

    for (const [_id, line] of $lines) {
      const { width, height } = $canvasStore;
      const { keyframes } = line;

      const schedule = getSchedule({ 
        keyframes,
        width, height,
        milliseconds: TOTAL_TIME,
        minVal: 50,
        maxVal: 2000,
      });

      playSchedule({ schedule, audioContext, mainGainNode })
    }

    updateTime();
  }

  function resume() {
    const audioContext = $audioContextStore;
    audioContext.resume();
  }

  function updateTime() {    
    const audioContext = $audioContextStore;
    timePerc = audioContext.currentTime / (TOTAL_TIME / 1000)

    reqId = requestAnimationFrame(updateTime)
  }

  function cancelTime() {
    timePerc = 0;
    const audioContext = $audioContextStore;
    audioContext.suspend()

    if (!reqId) return;
    cancelAnimationFrame(reqId)
    reqId = null;
  }

  function pauseTime() {
    if (!reqId) return;
    const audioContext = $audioContextStore;
    audioContext.suspend()

    cancelAnimationFrame(reqId)
    reqId = null;
  }
</script>

<style>

</style>

<div>
  <AudioPlayer bind:time={timePerc} />
  <div class="controls">
    <button on:click={play}>Play</button>
    <button on:click={pauseTime}>Pause</button>
    <button on:click={cancelTime}>Cancel</button>
  </div>
</div>
