<script>
  // svelte components
  import PlayButton from './playButton.svelte'
  import Timeline from './timeline.svelte'

  // audio API utils
  import { getSchedule } from '../../audio'
  import TonePlayer from '../../audio/tonePlayer'

  // stores
  import { lines, canvasStore } from '../../stores/canvas'

  let tonePlayer = new TonePlayer(3000);
  
  let timePerc = 0;
  let reqId;
  let startTime;

  let length = 3;
  $: {
    tonePlayer.runTime = length * 1000;
  }

  let isPlaying = false;

  function loadSchedules() {
    const schedules = []
    for (const [_id, line] of $lines) {
      const { width, height } = $canvasStore;
      const { keyframes } = line;

      const schedule = getSchedule({ 
        keyframes,
        width, height,
        minVal: 50,
        maxVal: 2000,
      });

      schedules.push(schedule)
    }

    tonePlayer.schedules = schedules;
  }

  function updateTime() {    
    timePerc = tonePlayer.percentage;

    if (timePerc > 1) {
      isPlaying = false;
      timePerc = 0;
      return;
    }

    reqId = requestAnimationFrame(updateTime)
  }

  // since we use bind, isPlaying has not yet changed, but it will change itself
  // that means we are now a step right before isPlaying changed, so we are currently !isPlaying
  function togglePlay() {
    if (isPlaying) {
      tonePlayer.pause();
      cancelAnimationFrame(reqId);
    } else {
      loadSchedules();
      tonePlayer.start();
      updateTime();
    }
  }

  let isMuted = false;
  function toggleMute() {
    console.log('mute toggled')
    isMuted = !isMuted;
  }
</script>

<style>
  .container {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 10px;
  }

  .controls {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 10px;
  }
  .input-label {
    display: grid;
    grid-gap: 5px;
  }
</style>

<div class="container">
  <Timeline bind:percentage={timePerc} />
  
  <div class="controls">
    <PlayButton on:click={togglePlay} bind:isPlaying={isPlaying} />
    <button on:click={toggleMute}>{isMuted ? 'unmute' : 'mute'}</button>
    <div class="input-label">
      <span>Length (seconds)</span>
      <input type="number" bind:value={length} />
    </div>
  </div>
</div>
