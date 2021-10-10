<script lang="ts">
    import { rowsSt, maxFreqSt, lightenOddRowsSt, minFreqSt } from '$stores/graph';

    $: delta = $maxFreqSt - $minFreqSt;
    $: maxSize = Math.floor(Math.log10($maxFreqSt) + 1);
    $: HzArr = Array.from(
        { length: $rowsSt }, 
        (_, i) => {
            const rowPerc = ($rowsSt - i) / $rowsSt;
            const freq = $minFreqSt + delta * rowPerc;
            return `${freq.toFixed(1).padStart(maxSize, '0')} Hz`;
        });
</script>

<div class="frequencies" class:lighten-odd={$lightenOddRowsSt}>
    {#each HzArr as hz}
        <span>{hz}</span>
    {/each}
</div>

<style>
    .frequencies {
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

    .lighten-odd.frequencies span:nth-child(even) {
        color: #0005;
    }
</style>