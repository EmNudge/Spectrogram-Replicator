<script lang="ts">
    import type { Segment } from '../../../stores/canvas';

    export let segment: Segment;

    $: pointsSt = segment.pointsSt;
    $: points = $pointsSt;
</script>

{#each Array(points.length - 1) as _, i}
    <line
        x1="{points[i].x * 100}%"
        y1="{points[i].y * 100}%"
        
        x2="{points[i+1].x * 100}%"
        y2="{points[i+1].y * 100}%"    
    ></line>
{/each}

{#each points as { x, y }, i}
    <circle
        cx="{x * 100}%"
        cy="{y * 100}%"></circle>
{/each}

<style>
    circle, line {
        r: 5;
        stroke-width: 3px;
        stroke: blue;
        fill: white;
    }
</style>