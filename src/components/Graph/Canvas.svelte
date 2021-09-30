<script>
    import { pointsSt } from '../../stores/canvas';
</script>

{#each $pointsSt as { x, y }}
    <circle
        cx="{x * 100}%"
        cy="{y * 100}%"></circle>
{/each}

<style>
    circle {
        r: 5;
        stroke-width: 3px;
        stroke: blue;
        fill: white;
    }
</style>