<script>
  export let time;
  export let min = 0;
  export let max = 1;

  let rangeEl;

  let isDragging = false;
  let mouseX = 0;

  function handleMouseDown() { isDragging = true; }
  function handleMouseUp() { isDragging = false; }

  function handleHover(e) {
    if (!isDragging) return;

    const { offsetLeft, offsetWidth } = rangeEl;
    const { clientX } = e;

    let x = clientX - offsetLeft;
    if (x)

    if (clien)
    console.log({ offsetLeft, offsetWidth, clientX })

  }
</script>

<style>
  .range {
    width: 100%;
    background: #F9F6F6;
    height: 20px;
  }

  span {
    width: 10px;
    height: 20px;
    display: inline-block;
    background: #92A3FF;
  }
</style>

<svelte:window on:mousemove={handleHover} on:mouseup={handleMouseUp} />

<div class="range" bind:this={rangeEl} style="transform: translate({mouseX}px, 0px)">
  <span on:mousedown={handleMouseDown} />
</div>