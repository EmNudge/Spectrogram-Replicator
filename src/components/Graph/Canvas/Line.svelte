<script lang="ts">
    import type { Line } from '../../../stores/canvas';
    import Segment from './Segment.svelte';

    export let line: Line;
    $: segmentsSt = line.segmentsSt;
</script>

{#each $segmentsSt as segment}
    <Segment {segment} />
{/each}
