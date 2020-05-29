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
    {#each Array(xSections - 1) as _, i}
      <line
        x1={xSectionWidth * (i + 1)}
        y1={0}
        x2={xSectionWidth * (i + 1)}
        y2={height} />
    {/each}
  </g>
  <g class="y-sections">
    {#each Array(ySections - 1) as _, i}
      <line
        class:minor={$lightenOddGridStore && ySections % 2 === (i + 1) % 2}
        x1={0}
        y1={ySectionHeight * (i + 1)}
        x2={width}
        y2={ySectionHeight * (i + 1)} />
    {/each}
  </g>
</svg>
