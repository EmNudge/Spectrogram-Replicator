<script>
  // 3 seconds
  const TOTAL_TIME = 3000;
  
  let timePerc = 0;
  let reqId;
  let startTime;

  function updateTime() {
    if (!reqId && startTime) {
      startTime = new Date() - timePerc * (TOTAL_TIME / 100);
    } else if (!startTime) {
      startTime = new Date;
    }
    
    const elapsed = new Date() - startTime;
    timePerc = elapsed / TOTAL_TIME * 100

    if (timePerc > 100) {
      reqId = null;
      timePerc = 0;
      return;
    };

    reqId = requestAnimationFrame(updateTime)
  }

  function cancelTime() {
    timePerc = 0;

    if (!reqId) return;
    cancelAnimationFrame(reqId)
    reqId = null;
  }

  function pauseTime() {
    if (!reqId) return;

    cancelAnimationFrame(reqId)
    reqId = null;
  }
</script>

<style>
  input[type="range"] {
    width: 100%;
  }
</style>

<div>
  <div class="playhead">
    <input type="range" min={0} max={100} step={0.1} bind:value={timePerc} />
  </div>
  <div class="controls">
    <button on:click={() => updateTime(new Date)}>Play</button>
    <button on:click={pauseTime}>Pause</button>
    <button on:click={cancelTime}>Cancel</button>
  </div>
</div>
