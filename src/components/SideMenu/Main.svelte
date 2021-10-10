<script lang="ts">
    import { createTempLine } from "../../utils/canvas";
    import { activeLineSt, Color, linesSt, symbolLineLookupSt } from "$stores/canvas";
    import Line from './components/Line.svelte';

    function addLine() {
        const line = createTempLine();
        $activeLineSt = line.id;
        symbolLineLookupSt.update(symbolLineLookup => {
            symbolLineLookup.set(line.id, line);
            return symbolLineLookup;
        });
        $linesSt = [...$linesSt, line];
    }

    $: activeLine = $symbolLineLookupSt.get($activeLineSt)!;
    $: activeColorSt = activeLine?.colorSt;

    function handleColorClick(e) {
        if (e.target.localName !== 'button') return;

        const color = Number(e.target.dataset.color);
        $activeColorSt = color;
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
    <button disabled>Add Segment</button>
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