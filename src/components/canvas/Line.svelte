<script lang="ts">
  export let active = false;
  export let segments = new Map();
  export let hue = 0;

  import { debugModeStore } from '../../stores/canvas'
  import Segment from "./Segment.svelte";
</script>

<style>
  g:not(.active) {
    opacity: 0.8;
  }
</style>

<g style="--line-hue: {hue}" class:active>
  {#each [...segments] as [id, { nodes, dimensions }] (id)}
    <Segment {nodes} segmentId={id} inActiveLine={active} />
    {#if $debugModeStore && dimensions}
      <rect 
        style="fill: none; stroke: #000a"
        width="{100 * dimensions.width}%"
        height="{100 * dimensions.height}%"
        x="{100 * dimensions.x}%"
        y="{100 * dimensions.y}%"
      />
    {/if}
  {/each}
</g>
