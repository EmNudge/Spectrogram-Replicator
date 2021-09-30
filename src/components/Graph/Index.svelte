<script lang="ts">
    import { canvasWidthSt } from '../../stores/graph';
    import { pointsSt } from '../../stores/canvas';
    import Grid from './Grid.svelte';
    import Hertz from './Hertz.svelte';
    import Canvas from './Canvas.svelte';

    function handleClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.x;
        const y = e.clientY - rect.y;
        const point = {
            x: x / rect.width,
            y: y / rect.height,
        }
        $pointsSt = [...$pointsSt, point];
    }
</script>

<Hertz />

<svg
    class="graph"
    style="--graph-width: {$canvasWidthSt}px;"
    on:click={handleClick}>
    <Grid />
    <Canvas />
</svg>

<style>
     .graph {
        height: 500px;
    }
    svg {
        background: white;
        width: 100%;
        border-radius: 4px;
    }
    .graph {
        min-width: var(--graph-width);
    }
</style>