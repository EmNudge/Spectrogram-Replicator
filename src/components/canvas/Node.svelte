<script lang="ts">
  export let x: string;
  export let y: string;
  export let isActive: boolean;

  export let size = 5;
</script>

<style>
  circle {
    stroke: hsl(var(--line-hue, 0), 50%, 50%);
    transition: stroke 0.1s;
  }
  :global(.active circle:hover) {
    stroke: hsl(var(--line-hue, 0), 50%, 70%);
    cursor: pointer;
  }
  circle.active {
    fill: black;
  }
</style>

<circle
  cx={x}
  cy={y}
  r={size}
  stroke-width="3"
  fill="white"
  class:active={isActive}
  on:mousedown />
