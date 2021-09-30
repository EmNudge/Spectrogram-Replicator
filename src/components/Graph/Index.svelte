<script lang="ts">
    import { canvasWidthSt } from '../../stores/graph';
    import Lines from './Lines.svelte';
    import Hertz from './Hertz.svelte';
</script>

<Hertz />

<svg
    class="graph"
    style="--graph-width: {$canvasWidthSt}px;">
    <Lines />
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