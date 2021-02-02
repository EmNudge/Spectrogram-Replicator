<script lang="ts">
  // export let width;
  // export let height;
  export let bg;

  import Line from "./Line.svelte";
  import { 
    activeStore, linesStore, canvasStore, 
    showGridBG, gridBGOpacityStore
  } from "../../stores/canvas";
  import { moveNodes, addNode, getPos } from '../../canvas/exports';
  import { isNearNode } from '../../canvas/exports';
  import { lineBoundsCheck } from '../../canvas/boundsCheck'
  import click from '../../actions/click'
  import ValueChanger from './ValueChanger.svelte'
  import { tick, onMount } from 'svelte';
  import Freqs from './Freqs.svelte';
  import GridBG from './GridBG.svelte';
  import { handleKeyDown } from '../../utils/handleKeyDown';

  let canvasEl: SVGElement;
  $: canvasStore.set(canvasEl);

  let isDragging = false;

  let infoPos = { x: 0, y: 0 };
  let showMenu = false;

  let canvasDim = { width: 300, height: 300 };
  $: (() => {
    if (!canvasEl) return;
    const { width, height } = canvasEl.getBoundingClientRect();
    canvasDim = { width, height };
  })();

  let activeLine = null;
  $: lines = (() => {
    const activeLineId = $activeStore.lineId;
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

  function isColliding(e: MouseEvent) {
    const lines = $linesStore;
    const activeData = $activeStore;
    const line = lines.get(activeData.lineId);
    if (!line) return false;
    const segment = line.segments.get(activeData.segmentId);
    if (!segment) return false;

    const segColliding = lineBoundsCheck(line, segment, { ...getPos(e), id: Symbol() });
    return segColliding;
  }

  let dragPosition: { x: number, y: number } = null;
  function handleLeftClick(event: CustomEvent<MouseEvent>) {
    // when using custom events, we need to propogate stuff via event.detail
    const e = event.detail;
    
    // if (isColliding(e)) return;

    isDragging = true;
    dragPosition = getPos(e);
    
    if (!$linesStore.size) {
      addNode(e)
      return;
    }

    const hoveringOnNode = isNearNode(e);
    if (hoveringOnNode) return;
    
    addNode(e);
  }

  function handleRightClick(e: CustomEvent<MouseEvent>) {
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

  function handleHover(e: MouseEvent) {
    if (!isDragging) return;

    moveNodes(e, dragPosition);
    dragPosition = getPos(e);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (showMenu) return;
    handleKeyDown(e);
  }
</script>

<style>
  .canvas {
    background: #eee;
  }

  svg {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
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
    width: 100%;
    height: 100%;
  }
</style>

<svelte:window on:mouseup={handleMouseUp} on:keydown={onKeyDown} />

<Freqs />

<div 
    class="canvas"
    use:click
    on:leftclick={handleLeftClick}
    on:rightclick={handleRightClick}

    on:mousemove={handleHover}>

  {#if bg}
    <img src={bg} alt="background" style="opacity: {$gridBGOpacityStore}"/>
  {/if}

  {#if $showGridBG}
    <GridBG {...canvasDim} />
  {/if}

  <svg
    bind:this={canvasEl}
    on:contextmenu|preventDefault>

    {#each lines as { hue, segments }}
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