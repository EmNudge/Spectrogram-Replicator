<script>
  import { gridDimStore, lightenOddGridStore } from "stores/canvas";

  export let width;
  export let height;

  $: [xSections, ySections] = $gridDimStore;
  $: xSectionWidth = width / xSections;
  $: ySectionHeight = height / ySections;
</script>

<style>
  svg {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  line {
    stroke-width: 2;
    stroke-dasharray: 15;
    stroke: #999;
  }
  line.minor {
    stroke: #ccca;
  }
</style>

<svg>
  <g>
    {#if xSections}
      {#each Array(xSections - 1) as _, i}
        <line
          x1="{(i+1)/xSections*100}%"
          y1="0%"
          x2="{(i+1)/xSections*100}%"
          y2="100%" />
      {/each}
    {/if}
  </g>
  <g class="y-sections">
    {#if ySections}
      {#each Array(ySections - 1) as _, i}
        <line
          class:minor={$lightenOddGridStore && ySections % 2 === (i + 1) % 2}
          x1="0%"
          y1="{(i+1)/ySections*100}%"
          x2="100%"
          y2="{(i+1)/ySections*100}%" />
      {/each}
    {/if}
  </g>
</svg>
