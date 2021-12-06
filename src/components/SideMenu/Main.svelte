<script lang="ts">
    import type { Line as LineType } from '$stores/canvas'
    import { 
        createTempLine, createTempSegment, isTempLine,
        selectAllPointsOnSegment, selectAllSegmentsOnLine
    } from "../../utils/canvas";
    import { activeSegmentSt, activeLineSt, Color, linesSt, symbolLineLookupSt } from "$stores/canvas";
    import Line from './components/Line.svelte';
    import { get } from 'svelte/store';

    function addLine() {
        const line = createTempLine();
        $activeLineSt = line.id;
        $activeSegmentSt = Symbol();

        symbolLineLookupSt.update(symbolLineLookup => {
            symbolLineLookup.set(line.id, line);
            return symbolLineLookup;
        });
        $linesSt = [...$linesSt, line];
    }
    function addSegment() {
        if (isTempLine(activeLine)) return;
        const line = activeLine as LineType;
        const segment = createTempSegment(line);
        activeSegmentSt.set(segment.id);

        line.segmentsSt.update(segments => [...segments, segment]);
    }

    $: activeLine = $symbolLineLookupSt.get($activeLineSt)!;
    $: activeColorSt = activeLine?.colorSt;

    function handleColorClick(e) {
        if (e.target.localName !== 'button') return;

        const color = Number(e.target.dataset.color);
        $activeColorSt = color;
    }

    function deleteLine() {
        const activeId = activeLine.id;
        linesSt.update(lines => lines.filter(({ id }) => id !== activeId));
    }
    function deleteSegment() {
        if (!('segmentsSt' in activeLine)) return;
        const activeSegmentId = $activeSegmentSt;
        const newSegments = get(activeLine.segmentsSt).filter(({ id }) => id != activeSegmentId);
        
        if (newSegments.length === 0) {
            // downgrade to TempLine
            const downgradeId = activeLine.id;
            linesSt.update(lines => lines.map(line => {
                if (line.id !== downgradeId) return line;

                const { nameSt, colorSt, id } = line;
                return { nameSt, colorSt, id };
            }))
        } else {
            activeLine.segmentsSt.set(newSegments);
        }
        $activeSegmentSt = Symbol();
    }
    function selectSegments() {
        if (!('segmentsSt' in activeLine)) return;
        selectAllSegmentsOnLine(activeLine);
    }
    function selectPointsInSegment() {
        if (!('segmentsSt' in activeLine)) return;
        const activeSegmentId = get(activeSegmentSt);
        const segment = get(activeLine.segmentsSt).find(s => s.id === activeSegmentId)!;
        
        if (!('pointsSt' in segment)) return;
        selectAllPointsOnSegment(segment);
    }
</script>

<div class="row title-row">
	<h2>Line Manager</h2>
</div>

<div>
    <h3>Lines</h3>
    <div class="lines">
        {#each $linesSt as line (line.id)}
            <Line {line} />
        {/each}
    </div>
</div>

<div>
    <button on:click={addLine}>Add Line</button>
    <button disabled={!Boolean($linesSt.length)} on:click={addSegment}>Add Segment</button>
</div>

{#if $activeLineSt}
    <div>
        <h3>Line Color</h3>

        <div class="colors" on:click={handleColorClick}>
            {#each Object.values(Color) as color}
                {#if !isNaN(Number(color))}
                    <button 
                        class="color"
                        class:active={color === $activeColorSt}
                        style="--col: {color}"
                        data-color={color}
                    ></button>
                {/if}
            {/each}
        </div>
    </div>
    
    <h3>Actions</h3>
    <div>
        <h4>Line</h4>
        <br>
        <button on:click={deleteLine}>Delete Line</button>
        <button on:click={selectSegments}>Select All Points</button>
        {#if $activeSegmentSt}
            <h4>Segment</h4>
            <br>
            <button on:click={deleteSegment}>Delete Active Segment</button>
            <button on:click={selectPointsInSegment}>Select All Points</button>
        {/if}

    </div>
{/if}

<style>
    .lines {
        display: grid;
        padding: 5px;
    }
    .colors {
        display: flex;
    }
    .colors .color {
        height: 25px;
        width: 25px;
        padding: 0;
        border-radius: 0;
        margin: 10px;
        border: none;
        background: hsl(var(--col), 50%, 50%);
    }
    .colors .color.active {
        outline: 2px solid black;
        opacity: .5;
    }
</style>