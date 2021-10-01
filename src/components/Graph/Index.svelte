<script lang="ts">
    import { canvasWidthSt } from '../../stores/graph';
    import { handleClick } from './utils';
    import Grid from './Grid.svelte';
    import Hertz from './Hertz.svelte';
    import Canvas from './Canvas/Index.svelte';
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