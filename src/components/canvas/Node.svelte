<script>
  export let x;
  export let y;
  export let isActive;

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
