<script lang="ts">
    import type { Segment } from '$stores/canvas';
    import { debugModeSt } from '$stores/graph';
    import { getPercBounds } from '../utils';
    import Point from './Point.svelte';

    export let segment: Segment;
    export let color: number;

    $: pointsSt = segment.pointsSt;
    $: points = $pointsSt;
    $: boundsSt = segment.boundsSt;
</script>

{#if $debugModeSt}
    <rect {...getPercBounds($boundsSt)} />
{/if}

<g style="--col: {color}">
    {#each Array(points.length - 1) as _, i}
        <line
            x1="{points[i].x * 100}%"
            y1="{points[i].y * 100}%"
            
            x2="{points[i+1].x * 100}%"
            y2="{points[i+1].y * 100}%"
        ></line>
    {/each}

    {#each $pointsSt as point (point.id)}
        <Point {point} />
    {/each}
</g>

<style>
    line {
        stroke-width: 3px;
        --lightness: 50%;
        stroke: hsl(var(--col), 50%, var(--lightness));
        fill: white;
    }
    rect {
        fill: none;
        stroke-width: 2px;
        stroke: orange;
    }
</style>