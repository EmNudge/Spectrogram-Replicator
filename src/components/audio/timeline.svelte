<script>
  export let percentage = 0;

  import { clamp } from "../../utils";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let rangeEl;

  let isDragging = false;
  let xPos = 0;

  function handleMouseDown(e) {
    isDragging = true;

    movePlayhead(e);
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleHover(e) {
    if (!isDragging) return;

    movePlayhead(e);
  }

  function movePlayhead(e) {
    const { offsetLeft, offsetWidth } = rangeEl;
    const { clientX } = e;

    const mouseX = clamp(clientX - offsetLeft, 0, offsetWidth);

    xPos = mouseX - 5

    percentage = mouseX / offsetWidth;

    dispatch('move', { percentage });
  }
</script>

<style>
  .range {
    width: 100%;
    background: #f9f6f6;
    height: 20px;
    overflow: hidden;

    --color: #92a3ff;
  }

  .playhead {
    display: flex;
    flex-direction: column;
  }
  .base {
    width: 10px;
    height: 20px;
    display: inline-block;
    background: var(--color);
  }
  .triangle {
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    
    border-bottom: 5px solid var(--color);
  }
</style>

<svelte:window on:mousemove={handleHover} on:mouseup={handleMouseUp} />

<div class="range" bind:this={rangeEl} on:mousedown={handleMouseDown}>
  <div class="playhead" style="transform: translate({xPos}px, 0px)">
    <span class="triangle" />
    <span class="base" />
  </div>
</div>
