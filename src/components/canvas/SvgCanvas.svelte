<script>
  export let width;
  export let height;

  import Line from "./Line.svelte";
  import { createEventDispatcher } from "svelte";
  import { activeLineStore, linesStore, activeNodeStore, canvasStore } from "../../stores/canvas.js";
  import { moveNode, addNode, deleteNode } from './utils.js'

  const dispatch = createEventDispatcher();

  let canvasEl;
  $: canvasStore.set(canvasEl);

  let isDragging = false;

  const randStr = Math.random().toString(16).slice(2, 8);
  const activeId = `active-line-${randStr}`;

  function handleMouseDown(e) {
    isDragging = true;

    // check if clicking on a node by position checking
    if ($activeLineStore) {
      // get mouse pos relative to svg pos
      const { x: offsetX, y: offsetY } = canvasEl.getBoundingClientRect()
      const mouse = { x: e.clientX - offsetX, y: e.clientY - offsetY };

      const line = $linesStore.get($activeLineStore);
  
      for (const node of line.nodes) {
        const xDist = Math.abs(node.x - mouse.x);
        const yDist = Math.abs(node.y - mouse.y);
        if (xDist > 5 || yDist > 5) continue;

        return;
      }
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

  function handleKeyDown(e) {
    if (!['Delete', 'Backspace'].includes(e.key)) return;

    deleteNode();
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

<svelte:window on:mouseup={handleMouseUp} on:keydown={handleKeyDown} />

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
