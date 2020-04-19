<script>
  export let pos;

  import {
    activeLineStore,
    linesStore,
    activeNodeStore,
    canvasStore
  } from "stores/canvas.js";
  import {
    minFreqStore,
    maxFreqStore,
    audioLengthStore
  } from "stores/audio";
  import { getActiveNode, getSegmentDimensions } from "../../canvas/exports";
  import { get } from "svelte/store";
  import { restrictInput, transformInput } from "../../actions";

  import Window from "../Window.svelte";
  import { clamp, remap } from "../../utils";

  const { node } = getActiveNode($linesStore);
  let x = node.x;
  let y = node.y;

  let percentageMode = false;

  let time, frequency;
  function setTimeAndFreq() {
    time = (x * $audioLengthStore).toFixed(3);
    frequency = remap(1 - y, 0, 1, $minFreqStore, $maxFreqStore);
  }
  setTimeAndFreq();

  $: {
    linesStore.update(lines => {
      const { segment, node } = getActiveNode(lines);

      if (percentageMode) {
        node.x = x;
        node.y = y;
        setTimeAndFreq();
      } else {
        node.x = time / $audioLengthStore;
        node.y = 1 - remap(frequency, $minFreqStore, $maxFreqStore, 0, 1);
        x = node.x;
        y = node.y;
      }

      segment.nodes.sort((a, b) => a.x - b.x);

      segment.dimensions = getSegmentDimensions(segment);

      return lines;
    });
  }

  function updatePos(e) {
    pos = e.detail.pos;
  }

  const clampTime = val => clamp(+val, 0, $audioLengthStore);
  const clampHz = val => clamp(+val, $minFreqStore, $maxFreqStore);
  const truncateTime = () => time = time.toFixed(3);

  function changeFormat() {
    percentageMode = !percentageMode;
  }
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    align-items: flex-end;
  }

  label {
    display: flex;
    flex-direction: column;
  }

  .input {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    align-items: baseline;
  }
  input[type=range] {
    margin-bottom: 20px;
  }
</style>

<Window title="node editor" on:close {...pos}>
  <div class="container">
    {#if percentageMode}
      <label>
        <span>x value</span>
        <input
          type="number"
          use:transformInput={val => clamp(+val, 0, 1)}
          bind:value={x} />
      </label>

      <input type="range" bind:value={x} step={0.001} min={0} max={1} />

      <label>
        <span>y value</span>
        <input
          type="number"
          use:transformInput={val => clamp(+val, 0, 1)}
          bind:value={y} />
      </label>

      <input type="range" bind:value={y} step={0.001} min={0} max={1} />
    {:else}
      <label>
        <span>Time (seconds)</span>
        <div class="input">
          <input 
            type="number" 
            use:transformInput={clampTime} 
            bind:value={time} 
            on:blur={truncateTime} />
          <span>/ {$audioLengthStore} sec.</span>
        </div>
      </label>

      <input
        type="range"
        bind:value={time}
        step={0.001}
        min={0}
        max={$audioLengthStore} />

      <label>
        <span>Frequency (Hz)</span>
        <div class="input">
          <input
            type="number"
            use:transformInput={clampHz}
            bind:value={frequency} />
            <span>/ {$maxFreqStore} Hz</span>
        </div>
      </label>  

      <input
        type="range"
        bind:value={frequency}
        step={0.001}
        min={$minFreqStore}
        max={$maxFreqStore} />
    {/if}
  </div>
  <button on:click={changeFormat}>Change Format</button>
</Window>
