<script lang="ts">
    import { activeLineSt, linesSt, symbolLineLookupSt } from "../../stores/canvas";
</script>

<div class="row title-row">
	<h2>Line Manager</h2>
</div>

<div>Nothing here yet!</div>

<div>
    <h3>Lines</h3>
    <div class="lines">
        {#each $linesSt as line, i}
            <div 
                class="line" 
                class:active={$activeLineSt == line.id}
                on:click={() => $activeLineSt = line.id}
            >
                Line {i}
            </div>
        {/each}
    </div>
</div>

<div>
    <button>Add Line</button>
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
        justify-content: space-between;
        align-items: center;
    }
    .active {
        background: #0002;
    }
</style>