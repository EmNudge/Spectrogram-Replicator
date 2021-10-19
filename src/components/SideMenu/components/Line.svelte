<script>
    import { activeLineSt, activeSegmentSt } from "$stores/canvas";
    import { isTempLine, isTempSegment } from "$utils/canvas";

    export let line;

    $: colorSt = line.colorSt;
    $: nameSt = line.nameSt;
    $: segmentsSt = line.segmentsSt;
    $: isTemp = isTempLine(line);
</script>

<div 
    class="line" 
    class:active={$activeLineSt == line.id}
    class:temp={isTemp}
    on:click={() => $activeLineSt = line.id}
>
    <span class="box" style="--col: {$colorSt}"></span>    
    <span>{$nameSt}</span>
</div>

{#if !isTemp}
    {#each $segmentsSt as segment}
        <div 
            class="segment"
            class:active={$activeSegmentSt == segment.id}
            class:temp={isTempSegment(segment)}
            on:click={() => $activeSegmentSt = segment.id}
        >
            Segment
        </div>
    {/each}
{/if}

<style>
    .line {
        display: flex;
        background: none;
        padding: 5px 10px;
        align-items: center;
        cursor: pointer;
    }
    .segment {
        padding: 5px 15px;
        background: #0001;
        margin-left: 20px;
        cursor: pointer;
    }
    
    .active {
        background: #0002;
        cursor: inherit;
    }

    .temp {
        color: #0004;
    }
    
    .box {
        height: 15px;
        width: 15px;
        background: hsl(var(--col), 50%, 50%);
        margin-right: 10px;
    }
</style>