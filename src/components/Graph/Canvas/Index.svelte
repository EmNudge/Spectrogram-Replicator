<script>
    import { linesSt } from '../../../stores/canvas';
    import Line from './Line.svelte';
</script>

{#each $linesSt as line}
    <Line {line} />
{/each}
