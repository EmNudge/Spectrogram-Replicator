<script lang="ts">
    import type { Line, TempLine } from "$stores/canvas";
    import { get } from "svelte/store";
    import { activeLineSt, activeSegmentSt, symbolLineLookupSt } from "$stores/canvas";
    import { isTempLine, isTempSegment } from "$utils/canvas";

    export let line: Line | TempLine;

    $: colorSt = line.colorSt;
    $: nameSt = line.nameSt;
    $: segmentsSt = (line as Line)?.segmentsSt;
    $: isTemp = isTempLine(line);

    function makeLineActive() {
        if ($activeLineSt === line.id) return;
        
        $activeLineSt = line.id;
        const newLine = $symbolLineLookupSt.get(line.id)!;
        if (isTempLine(newLine)) {
            $activeSegmentSt = Symbol();
        } else {
            const segments = get((newLine as Line).segmentsSt);
            $activeSegmentSt = segments[0].id;
        }
    }

    const makeSegmentActive = (id: Symbol) => () => {
        $activeSegmentSt = id;
        if ($activeLineSt !== line.id) $activeLineSt = line.id;
    }
</script>

<div
    class="entry" 
    class:active={$activeLineSt == line.id}
>
    <div 
        class="line" 
        class:temp={isTemp}
        on:click={makeLineActive}
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
                on:click={makeSegmentActive(segment.id)}
            >
                Segment
            </div>
        {/each}
    {/if}
</div>

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
        margin-left: 20px;
        cursor: pointer;
    }
    
    .active .segment, .active .line {
        background: #0001;
    }
    .active .line {
        cursor: inherit;
    }
    .segment.active {
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