<script>
  import { onMount } from "svelte";
  import Canvas from "../canvas/canvas.js";

  let canvasEl, canvasContainer;
  let canvas;

  onMount(() => {
    const { width, height } = window.getComputedStyle(canvasContainer)
    canvasEl.width = parseInt(width)
    canvasEl.height = parseInt(height)
    canvas = new Canvas(canvasEl);
    canvas.draw();
  });

  const getPos = e => ({ x: e.offsetX, y: e.offsetY });

  function handleClick(e) {
    canvas.onClick(getPos(e));
    canvas.draw();
  }
  function handleHover(e) {
    canvas.handleHover(getPos(e));
    canvas.draw();
  }
  function handleMouseUp(e) {
    canvas.onRelease();
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
