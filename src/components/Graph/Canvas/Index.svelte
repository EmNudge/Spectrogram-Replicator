<script>
    import { linesSt } from '../../../stores/canvas';
    import Line from './Line.svelte';
</script>

{#each $linesSt as line}
    {#if 'segmentsSt' in line}
        <Line {line} />
    {/if}
{/each}
