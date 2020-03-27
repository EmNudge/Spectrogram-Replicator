<script>
  export let pos;

  import {
    activeLineStore,
    linesStore,
    activeNodeStore,
    canvasStore
  } from "../../stores/canvas.js";
  import { getActiveNode, getSegmentDimensions } from '../../canvas/exports'
  import { get } from "svelte/store";

  import Window from "../Window.svelte";
  import { clamp } from "../../utils";

  const { node } = getActiveNode($linesStore)
  let x = node.x;
  let y = node.y;

  function clampVal() {
    x = clamp(x, 0, 1);
    y = clamp(y, 0, 1);
  }

  // the previous code was simpler, but it annoyingly also ran on changes to the active node
  // when that happened, the new node would get the old position. This way, it only changes when x and y change
  $: {
    linesStore.update(lines => {
      const { segment, node } = getActiveNode(lines);
      node.x = x;
      node.y = y;

      segment.nodes.sort((a, b) => a.x - b.x);

      segment.dimensions = getSegmentDimensions(segment);

      return lines;
    });
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
