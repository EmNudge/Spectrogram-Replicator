<script>
	import {} from '../../stores/project';
	import { rows, columns, minFreq, maxFreq } from '../../stores/graph';
	import {} from '../../stores/sound';

	import Range from './components/Range.svelte';
	import NumberInput from './components/NumberInput.svelte';
    import CheckBox from './components/CheckBox.svelte';
</script>

<div class="row title-row">
	<h2>Graph</h2>
    <CheckBox title="Show Grid" />
    <CheckBox title="Debug Mode" />
</div>

<div class="row">
	<h3>Choose Background Image</h3>
	<div class="row split">
		<div>
			<button>Pick File</button>
		</div>
		<div>
			<button>Use Default Image</button>
		</div>
	</div>
</div>

<div class="row split">
	<div>
        <NumberInput 
            title="Min Frequency (Hz)"
            bind:value={$minFreq}
        />
	</div>
	<div>
        <NumberInput 
            title="Max Frequency (Hz)"
            bind:value={$maxFreq}
        />
	</div>
</div>

<div class="row">
	<Range title="Background Image Opacity" min={0} max={1} step={0.01} />
</div>

<div class="row">
    <Range title="Canvas Width" min={600} max={1500} />
</div>

<div class="row split">
	<div>
        <NumberInput 
            title="Columns"
            bind:value={$columns}
        />
	</div>
	<div>
        <NumberInput 
            title="Rows"
            bind:value={$rows}
        />
	</div>
</div>

<div class="row">
    <CheckBox title="Lighten Odd Rows" />
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
</style>
