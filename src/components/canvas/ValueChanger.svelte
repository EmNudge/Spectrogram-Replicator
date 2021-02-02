<script lang="ts">
  export let pos;

  import { linesStore, activeStore } from "../../stores/canvas.js";
  import { minFreqStore, maxFreqStore, audioLengthStore } from "../../stores/audio";

  import { getSegmentDimensions } from "../../canvas/exports";
  import { transformInput } from "../../actions";

  import Window from "../Window/Window.svelte";
  import { clamp, remap } from "../../utils";
  import { first } from '../../utils/hashmap';

  // get node that was right-clicked, only if it's the only node
  let node: Canvas.Node | null;
  $: node = ((activeData) => {
    if (activeData.segments.size > 1) return null;
    
    const activeSegment = first(activeData.segments);
    if (!activeSegment) return null;

    const [segmentId, nodes] = activeSegment;
    if (nodes.size > 1) return null;

    let nodeId = null;
    for (const node of nodes) nodeId = node;
    if (!nodeId) return null;

    const line = $linesStore.get(activeData.lineId);
    const segment = line.segments.get(segmentId);
    const node = segment.nodes.find(node => node.id === nodeId);

    return node;
  })($activeStore);

  let x: number | null = null;
  let y: number | null = null;
  $: if (node) {
    console.log(JSON.stringify(node))
    x = node.x;
    y = node.y;
  }

  let percentageMode = false;

  let time: any, frequency: number;
  function setTimeAndFreq() {
    time = (x * $audioLengthStore).toFixed(3);
    frequency = remap(1 - y, 0, 1, $minFreqStore, $maxFreqStore);
  }
  setTimeAndFreq();

  $: (() => {
    if (!node) return;
    if (x == null || y == null) return;

    linesStore.update(lines => {
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

      const { lineId, segmentId } = $activeStore;
      const segment = lines.get(lineId).segments.get(segmentId);
      segment.nodes.sort((a, b) => a.x - b.x);
      segment.dimensions = getSegmentDimensions(segment.nodes);

      return lines;
    });
  })();

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
  {#if true}
    <h1>Currently Broken</h1>
  {:else}
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
        <label for="v-c-time">
          <span>Time (seconds)</span>
          <div class="input">
            <input 
              type="number"
              name="v-c-time"
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

        <label for="v-c-freq">
          <span>Frequency (Hz)</span>
          <div class="input">
            <input
              type="number"
              name="v-c-freq"
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
  {/if}
</Window>
