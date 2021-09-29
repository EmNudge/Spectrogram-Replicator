<script lang="ts">
    import { rows, columns, maxFreq } from '../../stores/graph';

    const formatHz = (row: number) => {
        const freq = $maxFreq / $rows * row;
        const maxSize = Math.floor(Math.log10($maxFreq) + 1);
        return `${freq.toFixed(1).padStart(maxSize, '0')} Hz`;
    }
</script>

<div class="frequencies">
    {#each Array($rows) as _, i}
        <span style="">{formatHz($rows - i)}</span>
    {/each}
</div>

<svg class="graph">
    <g class="rows">
        {#each Array($rows) as _, i}
            {#if i > 0}
                <line
                    x1="0%"
                    x2="100%"
                    y1="{i/$rows * 100}%" 
                    y2="{i/$rows * 100}%"/>
            {/if}
        {/each}
    </g>
    <g>
        {#each Array($columns) as _, i}
            {#if i > 0}
                <line
                    y1="0%"
                    y2="100%"
                    x1="{i/$columns * 100}%" 
                    x2="{i/$columns * 100}%"/>
            {/if}
        {/each}
    </g>
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
    .frequencies span:nth-child(even) {
        color: #0005;
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
    .rows line:nth-child(odd) {
        stroke: #9994;
    }
</style>