<script lang="ts">
    import { canvasWidthSt } from '../../stores/graph';
    import { handleMouseDown, handleMouseMove, handleMouseUp } from './utils';
    import Grid from './Grid.svelte';
    import Hertz from './Hertz.svelte';
    import Canvas from './Canvas/Index.svelte';
</script>

<Hertz />

<svg
    class="graph"
    style="--graph-width: {$canvasWidthSt}px;"
    on:mousedown={handleMouseDown} on:mousemove={handleMouseMove} on:mouseup={handleMouseUp}>
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