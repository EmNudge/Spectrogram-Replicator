<script lang="ts">
	import { durationSt, currentTimeSt } from '../stores/sound';

	const displayText = (secs: number) =>
		String(Math.floor(secs / 60)).padStart(2, '0') +
		':' +
		String(Math.floor(secs % 60)).padStart(2, '0');

	function changeTime(e) {
		const { left, right } = e.currentTarget.getBoundingClientRect();
		$currentTimeSt = (e.clientX - left) / (right - left);
	}
	const getTimeFromStr = (str) => {
		const [minute, seconds] = str.split(':');
		return Number(minute) * 60 + Number(seconds);
	};
	function handleChangeTime(e) {
		const [current, goal] = e.target.value.split('/');
		if (!current || !goal) return;
		$durationSt = getTimeFromStr(goal);
		$currentTimeSt = getTimeFromStr(current) / $durationSt;
	}
</script>

<div class="play-container">
	<button>➤</button>
</div>

<div class="timeline">
	<div class="bar-container">
		<div on:click={changeTime} class="bar" style="--time-perc: {$currentTimeSt};" />
		<div class="times">
			{#each Array(10) as _, i}
				<span>{displayText((i / 10) * $durationSt)}</span>
			{/each}
		</div>
		<h3>Time (s)</h3>
	</div>
	<div class="time" on:input={handleChangeTime}>
		<input type="text" value="{displayText($durationSt * $currentTimeSt)}/{displayText($durationSt)}" />
	</div>
</div>

<style>
	.play-container {
		display: flex;
		align-items: flex-start;
	}
	button {
		height: 32px;
		font-size: 1.5em;
		color: #000a;
		width: 100%;
		border-radius: 4px;
	}
	.timeline {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-gap: 10px;
	}
	h3 {
		text-align: center;
		color: #000a;
	}
	.bar-container {
		display: grid;
		grid-gap: 10px;
	}
	.times {
		display: grid;
		grid-auto-flow: column;
	}
	input {
		width: 80px;
		height: 32px;
	}
	.bar {
		height: 32px;
		width: 100%;
		background: white;
		border-radius: 4px;
		position: relative;
	}
	.bar:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: calc(var(--time-perc) * 100%);
		background: grey;
		border-radius: 4px;
	}
</style>
