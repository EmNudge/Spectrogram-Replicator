<script lang="ts">
    import { canvasWidthSt } from '$stores/graph';
    import { draggerSt } from '$stores/canvas';
    import { handleMouseDown, handleMouseMove, handleMouseUp } from './utils';
    import Grid from './Grid.svelte';
    import Hertz from './Hertz.svelte';
    import Canvas from './Canvas/Index.svelte';
import { currentTimePercSt } from '$stores/sound';
</script>

<Hertz />

<svg
    class="graph"
    style="--graph-width: {$canvasWidthSt}px;"
    class:dragging={$draggerSt}
    on:mousedown={handleMouseDown} on:mousemove={handleMouseMove} on:mouseup={handleMouseUp}>
    <Grid />
    <rect x="{$currentTimePercSt * 100}%" y="0%"></rect>
    <Canvas />
</svg>

<style>
    .graph {
        height: 450px;
    }
    .dragging :global(circle) {
        cursor: move;
    }
    svg {
        background: white;
        width: 100%;
        border-radius: 4px;
    }
    rect {
        fill: #0003;
        width: 2px;
        height: 100%;
        transition: .05s;
    }
    .graph {
        min-width: var(--graph-width);
    }
</style>