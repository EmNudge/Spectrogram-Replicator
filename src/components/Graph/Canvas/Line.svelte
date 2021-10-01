<script lang="ts">
    import type { Line } from '../../../stores/canvas';
    import { debugModeSt } from '../../../stores/graph';
    import Segment from './Segment.svelte';
    import { getPercBounds } from '../utils';

    export let line: Line;
    $: segmentsSt = line.segmentsSt;
</script>

{#each $segmentsSt as segment}
    <Segment {segment} />
{/each}

{#if $debugModeSt}
    <rect {...getPercBounds(line.bounds)} />
{/if}

<style>
    rect {
        fill: none;
        stroke-width: 2px;
        stroke: pink;
    }
</style>