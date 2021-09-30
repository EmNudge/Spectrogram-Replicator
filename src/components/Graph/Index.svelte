<script lang="ts">
    import { rowsSt, columnsSt, maxFreqSt, lightenOddRowsSt, canvasWidthSt, minFreqSt, showGridst } from '../../stores/graph';

    $: delta = $maxFreqSt - $minFreqSt;
    $: maxSize = Math.floor(Math.log10($maxFreqSt) + 1);
    $: HzArr = Array.from(
        { length: $rowsSt }, 
        (_, i) => {
            const rowPerc = ($rowsSt - i) / $rowsSt;
            const freq = $minFreqSt + delta * rowPerc;
            return `${freq.toFixed(1).padStart(maxSize, '0')} Hz`;
        });

    columnsSt.subscribe(n => console.log({ columns: n }))
    rowsSt.subscribe(n => console.log({ rows: n }))
</script>

<div class="frequencies" class:lighten-odd={$lightenOddRowsSt}>
    {#each HzArr as hz}
        <span>{hz}</span>
    {/each}
</div>

<svg
    class="graph"
    style="--graph-width: {$canvasWidthSt}px;"
    class:lighten-odd={$lightenOddRowsSt}>

    {#if $showGridst}
        <g class="rows">
            {#each Array($rowsSt) as _, i}
                {#if i > 0}
                    <line
                        x1="0%"
                        x2="100%"
                        y1="{i/$rowsSt * 100}%" 
                        y2="{i/$rowsSt * 100}%"/>
                {/if}
            {/each}
        </g>
        <g>
            {#each Array($columnsSt) as _, i}
                {#if i > 0}
                    <line
                        y1="0%"
                        y2="100%"
                        x1="{i/$columnsSt * 100}%" 
                        x2="{i/$columnsSt * 100}%"/>
                {/if}
            {/each}
        </g>
    {/if}
    
</svg>

<style>
    .frequencies, .graph {
        height: 500px;
    }
    .frequencies {
        display: grid;
    }
    .frequencies span {
        margin-top: -10px;
        font-size: 14px;
        text-align: right;
        font-weight: bold;
        color: #000a;
    }
    svg {
        background: white;
        width: 100%;
        border-radius: 4px;
    }
    svg line {
        stroke-width: 2;
        stroke-dasharray: 15;
        stroke: #999;
    }

    .graph {
        min-width: var(--graph-width);
    }

    .lighten-odd.frequencies span:nth-child(even) {
        color: #0005;
    }
    .lighten-odd .rows line:nth-child(odd) {
        stroke: #9994;
    }
</style>