<script>
  // export let width;
  // export let height;
  export let bg;

  import Line from "./Line.svelte";
  import { activeLineStore, linesStore, activeSegmentStore, activeNodeStore, canvasStore, allowDeleteStore } from "../../stores/canvas.js";
  import { moveNode, addNode, getPos } from './utils'
  import { isNearNode, deleteNode, getActiveSegment } from '../../canvas/exports';
  import { lineBoundsCheck } from '../../canvas/boundsCheck'
  import click from '../../actions/click'
  import ValueChanger from './ValueChanger.svelte'
  import { tick } from 'svelte';

  let canvasEl;
  $: canvasStore.set(canvasEl);

  let isDragging = false;

  let infoPos = { x: 0, y: 0 };
  let showMenu = false;

  let activeLine = null;
  $: lines = (() => {
    const activeLineId = $activeLineStore;
    const nonActiveLines = [];
    
    for (const [id, line] of [...$linesStore.entries()]) {
      if (id === activeLineId) {
        activeLine = line;
        continue;
      }

      nonActiveLines.push(line);
    }

    return nonActiveLines;
  })();

  function isColliding(e) {
    try {
      const { line, segment } = getActiveSegment($linesStore);

      const segColliding = lineBoundsCheck(line, segment, getPos(e));
      return segColliding;
    } catch(e) {
      return false;
    }
  }

  function handleLeftClick(event) {
    // when using custom events, we need to propogate stuff via event.detail
    const e = event.detail;
    
    if (isColliding(e)) return;

    isDragging = true;
    
    if (!$linesStore.size) {
      addNode(e)
      return;
    }

    const hoveringOnNode = isNearNode(e);
    if (hoveringOnNode) return;
    
    addNode(e);
  }

  function handleRightClick(e) {
    // when using custom events, we need to propogate stuff via event.detail
    infoPos = { x: e.detail.clientX, y: e.detail.clientY };

    // we need to rerender to keep drag working correctly
    if (!showMenu) {
      showMenu = true;
    } else {
      showMenu = false;
      // we use tick so that svelte causes a rerender first
      tick().then(() => showMenu = true)
    }
  }

  function closeMenu() {
    showMenu = false;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleHover(e) {
    if (!isDragging) return;

    moveNode(e);
  }

  function handleKeyDown(e) {
    if (showMenu) return;

    if (!['Delete', 'Backspace'].includes(e.key)) return;

    if (!$allowDeleteStore) return;

    deleteNode();
  }
</script>

<style>
  svg {
    background: #eeea;
    width: 100%;
    height: 100%;
    min-height: 400px;
  }

  div {
    position: relative;
    overflow: hidden;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
</style>

<svelte:window on:mouseup={handleMouseUp} on:keydown={handleKeyDown} />

<div class="canvas">
  {#if bg}
    <img src={bg} alt="background" />
  {/if}

  <svg
    bind:this={canvasEl}

    on:contextmenu|preventDefault
    use:click
    on:leftclick={handleLeftClick}
    on:rightclick={handleRightClick}

    on:mousemove={handleHover}
    >

    {#each lines as [id, { hue, segments }], i}
      <Line {segments} {hue} />
    {/each}

    {#if activeLine}
      <Line 
        active={true}
        segments={activeLine.segments} 
        hue={activeLine.hue} 
      />
    {/if}
    
  </svg>
</div>

{#if showMenu}
  <ValueChanger pos={infoPos} on:close={closeMenu} />
{/if}