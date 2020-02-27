<script>
  export let pos;

  import {
    activeLineStore,
    linesStore,
    activeNodeStore,
    canvasStore
  } from "../../stores/canvas.js";
  import { getNodeInActiveLine, updateNodeInActiveLine } from "./utils.js";
  import { get } from "svelte/store";
  import { drag, clickOutside } from "../../actions";
  import { clamp } from "../../utils";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()

  const nodeId = get(activeNodeStore);
  const node = getNodeInActiveLine(nodeId);
  let x = node.x;
  let y = node.y;

  const width = $canvasStore.width.baseVal.value;
  const height = $canvasStore.height.baseVal.value;

  $: {
    if (x > width) x = clamp(x, 0, width);
    if (y > width) y = clamp(y, 0, width);

    const id = get(activeNodeStore);
    updateNodeInActiveLine({ x, y, id });
  }

  function updatePos(e) {
    pos = e.detail.pos;
  }

  function closeSelf() {
    dispatch('close')
  }
</script>

<style>
  .container {
    z-index: 5;

    display: grid;
    grid-template-rows: 1fr 2fr;
    grid-gap: 15px;

    background: white;
    box-shadow: 2px 2px 2px #00000026;

    position: absolute;
    padding: 20px;
  }
</style>

<div
  style="left: {pos.x}px; top: {pos.y}px"
  class="container"
  
  use:drag
  on:drag={updatePos}

  use:clickOutside
  on:clickoutside={closeSelf}>
  <div>
    <label>x value</label>
    <input type="number" bind:value={x} placeholder="new X value" />
    <input
      type="range"
      bind:value={x}
      min={0}
      max={width}
      placeholder="new X value" />
  </div>
  <div>
    <label>y value</label>
    <input type="number" bind:value={y} placeholder="new Y value" />
    <input
      type="range"
      bind:value={y}
      min={0}
      max={height}
      placeholder="new Y value" />
  </div>
</div>
