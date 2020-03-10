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

  import Window from "../Window.svelte";
  import { clamp } from "../../utils";

  const nodeId = get(activeNodeStore);
  const node = getNodeInActiveLine(nodeId);
  let x = node.x;
  let y = node.y;

  function clampVal() {
    x = clamp(x, 0, 1);
    y = clamp(y, 0, 1);
  }

  $: {
    const id = get(activeNodeStore);
    updateNodeInActiveLine({ x, y, id });
  }

  function updatePos(e) {
    pos = e.detail.pos;
  }
</script>

<style>
  div {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    align-items: flex-end;
  }

  label {
    display: flex;
    flex-direction: column;
  }
</style>

<Window title="node editor" on:close {...pos}>
  <div>
    <label>
      <span>x value</span>
      <input type="number" bind:value={x} on:input={clampVal} placeholder="new X value" />
    </label>

    <input type="range" bind:value={x} step={.001} min={0} max={1} />
  </div>

  <div>
    <label>
      <span>y value</span>
      <input type="number" bind:value={y} on:input={clampVal} placeholder="new y value" />
    </label>

    <input type="range" bind:value={y} step={.001} min={0} max={1} />
  </div>
</Window>
