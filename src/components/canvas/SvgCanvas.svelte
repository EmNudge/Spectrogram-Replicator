<script>
  export let width;
  export let height;

  import Line from "./Line.svelte";
  import { createEventDispatcher } from "svelte";
  import { activeLineStore, linesStore, activeNodeStore, canvasStore } from "../../stores/canvas.js";
  import { moveNode, addNode } from './utils.js'

  const dispatch = createEventDispatcher();

  let canvasEl;
  $: canvasStore.set(canvasEl);

  let isDragging = false;

  const randStr = Math.random().toString(16).slice(2, 8);
  const activeId = `active-line-${randStr}`;

  function handleMouseDown(e) {
    isDragging = true;

    // if we clicked on a node in the active line, don't notify
    if (e.target.cx) {
      const lineGroup = e.target.parentElement;
      const isActive = lineGroup.classList.contains("active");
      if (isActive) return;
    }

    addNode(e);
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleHover(e) {
    if (!isDragging) return;

    moveNode(e);
  }
</script>

<style>
  svg {
    background: #eee;
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
</style>

<svelte:window on:mouseup={handleMouseUp} />

<svg
  {width}
  {height}
  bind:this={canvasEl}
  on:mousedown={handleMouseDown}
  on:mousemove={handleHover}>

  {#each [...$linesStore.entries()] as [id, { hue, nodes }], i}
    <Line {nodes} {hue} active={$activeLineStore === id} id={$activeLineStore === id ? activeId : ''} />
  {/each}

  <use id="use" xlink:href={`#${activeId}`} />

</svg>
