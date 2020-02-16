<script>
  import { onMount } from "svelte";
  import Canvas from "../canvas/canvas.js";
  import { canvasStore } from '../stores/canvas'

  let canvasEl, canvasContainer;

  onMount(() => {
    const { width, height } = window.getComputedStyle(canvasContainer)
    canvasEl.width = parseInt(width)
    canvasEl.height = parseInt(height)
    const canvas = new Canvas(canvasEl);
    canvasStore.set(canvas)
    
    $canvasStore.draw();
  });

  const getPos = e => ({ x: e.offsetX, y: e.offsetY });

  function handleClick(e) {
    $canvasStore.onClick(getPos(e));
    $canvasStore.draw();
  }
  function handleHover(e) {
    $canvasStore.handleHover(getPos(e));
    $canvasStore.draw();
  }
  function handleMouseUp(e) {
    $canvasStore.onRelease();
  }
</script>

<style>
  canvas {
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25);
    background: #fafafa;
  }
</style>

<div bind:this={canvasContainer}>
  <canvas
    bind:this={canvasEl}
    on:mousedown={handleClick}
    on:mouseup={handleMouseUp}
    on:mousemove={handleHover} />
</div>
