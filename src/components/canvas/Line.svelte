<script>
  export let active = false;
  export let segments = [];
  export let hue = 0;
  export let id = '';

  import Segment from "./Segment.svelte";
</script>

<style>
  g:not(.active) {
    opacity: 0.8;
  }
</style>

<g style="--line-hue: {hue}" class:active {id}>
  {#each [...segments.entries()] as [id, { nodes }]}
    <Segment segmentId={id} {nodes} />
  {/each}
</g>
