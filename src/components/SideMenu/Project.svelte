<script lang="ts">
	import {
		rowsSt,
		columnsSt,
		minFreqSt,
		maxFreqSt,
		canvasWidthSt,
		lightenOddRowsSt,
		showGridst,
		debugModeSt
	} from '$stores/graph';

	import Range from './components/Range.svelte';
	import NumberInput from './components/NumberInput.svelte';
	import CheckBox from './components/CheckBox.svelte';
</script>

<div class="row title-row">
	<h2>Project</h2>
	<CheckBox title="Show Grid" bind:checked={$showGridst} />
	<CheckBox title="Debug Mode" bind:checked={$debugModeSt} />
</div>


<div class="row split">
	<div>
		<NumberInput title="Min Frequency (Hz)" bind:value={$minFreqSt} />
	</div>
	<div>
		<NumberInput title="Max Frequency (Hz)" bind:value={$maxFreqSt} />
	</div>
</div>


<div class="row">
	<Range title="Canvas Width" min={600} max={1500} bind:value={$canvasWidthSt} />
</div>

<h3 class="title">Graph</h3>
<div class="row split">
	<div>
		<NumberInput title="Columns" min={2} bind:value={$columnsSt} />
	</div>
	<div>
		<NumberInput title="Rows" min={2} bind:value={$rowsSt} />
	</div>
</div>

<div class="row">
	<CheckBox title="Lighten Odd Rows" bind:checked={$lightenOddRowsSt} />
</div>

<style>
	.title-row {
		display: grid;
		grid-template-columns: 1fr auto auto;
		grid-gap: 15px;
		align-items: center;
	}
	h2 {
		margin: 0;
	}
	.row.split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: var(--gap);
		background: none;
		padding: 0;
	}
	.row.split > * {
		padding: var(--padding);
		background: white;
		text-align: center;
	}
	h3.title {
		margin-bottom: 0;
	}
</style>
