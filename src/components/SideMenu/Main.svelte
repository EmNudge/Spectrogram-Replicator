<script lang="ts">
    import { createTempLine } from "../../utils/canvas";
    import { activeLineSt, linesSt, symbolLineLookupSt } from "../../stores/canvas";

    function addLine() {
        const line = createTempLine();
        $activeLineSt = line.id;
        symbolLineLookupSt.update(symbolLineLookup => {
            symbolLineLookup.set(line.id, line);
            return symbolLineLookup;
        });
        $linesSt = [...$linesSt, line];
    }
</script>

<div class="row title-row">
	<h2>Line Manager</h2>
</div>

<div>Nothing here yet!</div>

<div>
    <h3>Lines</h3>
    <div class="lines">
        {#each $linesSt as line (line.id)}
            <div 
                class="line" 
                class:active={$activeLineSt == line.id}
                on:click={() => $activeLineSt = line.id}
            >
                <span class="box" style="--col: {line.color}"></span>    
                <span>
                    {line.name}
                </span>
            </div>
        {/each}
    </div>
</div>

<div>
    <button on:click={addLine}>Add Line</button>
    <button disabled>Add Segment</button>
</div>

{#if $activeLineSt}
    <div>
        <h3>
            Active Line
        </h3>

        <button>Change Color</button>
        <button>Select All points</button>
    </div>
{/if}

<style>
    .lines {
        display: grid;
        padding: 5px;
    }
    .line {
        display: flex;
        background: #0001;
        padding: 5px 10px;
        align-items: center;
        cursor: pointer;
    }
    .active {
        background: #0002;
        cursor: inherit;
    }
    .box {
        height: 15px;
        width: 15px;
        background: hsl(var(--col), 50%, 50%);
        margin-right: 10px;
    }
</style>