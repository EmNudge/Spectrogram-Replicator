<script lang="ts">
    import { rowsSt, columnsSt, showGridst, lightenOddRowsSt } from '../../stores/graph';
</script>

{#if $showGridst}
    <g class="rows" class:lighten-odd={$lightenOddRowsSt}>
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

<style>
    line {
        stroke-width: 2;
        stroke-dasharray: 15;
        stroke: #999;
    }
    .lighten-odd line:nth-child(odd) {
        stroke: #9994;
    }
</style>