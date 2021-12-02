<script lang="ts">
    import type { Point } from '$stores/canvas';
    import { onMount } from 'svelte';
    import { activePointsSt, nodeToPointSt } from '$stores/canvas';
    
    export let point: Point;

    let node: SVGCircleElement;
    onMount(() => {
        $nodeToPointSt.set(node, point);
    });
</script>

<circle
    bind:this={node}
    class:active={$activePointsSt.has(point.id)}
    r="5"
    cx="{point.x * 100}%"
    cy="{point.y * 100}%"></circle>

<style>
    circle {
        stroke-width: 3px;
        --lightness: 50%;
        stroke: hsl(var(--col), 50%, var(--lightness));
        fill: white;
    }
    circle:hover {
        cursor: pointer;
        --lightness: 60%;
    }
    .active {
        --lightness: 75%;
    }
</style>