<script lang="ts">
    import type { Segment } from '../../../stores/canvas';
    import Point from './Point.svelte';

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

{#each $pointsSt as point (`${point.x}-${point.y}`)}
    <Point {point} />
{/each}


<style>
    line {
        stroke-width: 3px;
        --lightness: 50%;
        stroke: hsl(200, 50%, var(--lightness));
        fill: white;
    }
</style>