<script lang="ts">
    import type { Point } from '../../../stores/canvas';
    import { onMount } from 'svelte';
    import { activePointsSt, nodeToPointSt } from '../../../stores/canvas';
    
    export let point: Point;

    let node: SVGCircleElement;
    onMount(() => {
        $nodeToPointSt.set(node, point);
    });
</script>

<circle
    bind:this={node}
    class:active={$activePointsSt.has(point)}
    cx="{point.x * 100}%"
    cy="{point.y * 100}%"></circle>

<style>
    circle {
        r: 5;
        stroke-width: 3px;
        --lightness: 50%;
        stroke: hsl(200, 50%, var(--lightness));
        fill: white;
    }
    circle:hover {
        cursor: pointer;
        --lightness: 70%;
    }
    .active {
        --lightness: 90%;
    }
</style>