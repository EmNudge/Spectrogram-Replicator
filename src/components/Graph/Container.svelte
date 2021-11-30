<script lang="ts">
    import { canvasWidthSt } from '$stores/graph';
    import { specUrlSt, specOpacitySt } from "$stores/spectrogram";

    $: hasSpectorgram = $specUrlSt.length > 0;
</script>

<div 
    class="graph"
    class:empty={!hasSpectorgram}
    style="--graph-width: {$canvasWidthSt}px;"
>
    {#if hasSpectorgram}
        <img src={$specUrlSt} alt="spectrogram" style="--opacity: {$specOpacitySt}">
    {/if}
    <slot />
</div>

<style>
    .graph {
        height: 450px;
        min-width: var(--graph-width);
        position: relative;
    }
    .empty {
        background: white;
    }
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        user-select: none;
        z-index: -1;
        opacity: var(--opacity);
    }
</style>