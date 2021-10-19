<script lang="ts">
    import type { Line } from '$stores/canvas';
    import { debugModeSt } from '$stores/graph';
    import Segment from './Segment.svelte';
    import { getPercBounds } from '../utils';

    export let line: Line;
    $: colorSt = line.colorSt;
    $: segmentsSt = line.segmentsSt;
    $: boundsSt = line.boundsSt;
</script>

{#if $debugModeSt}
    <rect {...getPercBounds($boundsSt)} />
{/if}

{#each $segmentsSt as segment}
    <Segment {segment} color={$colorSt} />
{/each}

<style>
    rect {
        fill: none;
        stroke-width: 2px;
        stroke: pink;
    }
</style>