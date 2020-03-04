<script>
  // export let width;
  // export let height;
  export let bg;

  import Line from "./Line.svelte";
  import { activeLineStore, linesStore, activeNodeStore, canvasStore } from "../../stores/canvas.js";
  import { moveNode, addNode, deleteNode, isNearNode, getMouseCanvasPos, getNearNode } from './utils.js'
  import click from '../../actions/click'
  import ValueChanger from './ValueChanger.svelte'
  import { tick } from 'svelte';

  let canvasEl;
  $: canvasStore.set(canvasEl);

  let isDragging = false;

  const randStr = Math.random().toString(16).slice(2, 8);
  const activeId = `active-line-${randStr}`;

  let infoPos = { x: 0, y: 0 };
  let showMenu = false;

  function handleLeftClick(event) {
    // when using custom events, we need to propogate stuff via event.detail
    const e = event.detail;

    isDragging = true;

    const mouse = getMouseCanvasPos(e)
    if (isNearNode(mouse)) return;

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

    {#each [...$linesStore.entries()] as [id, { hue, nodes }], i}
      <Line 
        {nodes} 
        {hue} 
        active={$activeLineStore === id} 
        id={$activeLineStore === id ? activeId : ''} 
      />
    {/each}

    <use id="use" xlink:href={`#${activeId}`} />

  </svg>
</div>

{#if showMenu}
  <ValueChanger pos={infoPos} on:close={closeMenu} />
{/if}