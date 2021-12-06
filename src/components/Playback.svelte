<script lang="ts">
	import { durationSt, currentTimePercSt, currentTimeSt } from '$stores/sound';
	import { playLines } from '../audio';

	const displayText = (secs: number) => {
		const pad = (num: number) => String(Math.floor(num)).padStart(2, '0');
		const minute = pad(secs / 60);
		const second = pad(secs % 60);
		if ($durationSt > 10) return `${minute}:${second}`;

		const ms = pad(secs * 100);
		return `${minute}:${second}.${ms}`;
	};

	const TIME_REGEX = /([0-9]+):([0-9]+)(\.[0-9]+)?/;
	const getTimeFromStr = (str) => {
		const regRes = str.match(TIME_REGEX);
		if (!regRes) return 0;
		const [, minute, seconds, ms] = str.split(':');
		return Number(minute) * 60 + Number(seconds) + Number(ms || '0');
	};

	function handleChangeTime(e) {
		const [current, goal] = e.target.value.split('/');
		if (!current || !goal) return;
		$durationSt = getTimeFromStr(goal);
		$currentTimePercSt = getTimeFromStr(current) / $durationSt;
	}

	let isPlaying = false;
	let lastPausedTime = 0;
	let startTime: number;
	let linePlayer: { stop(): void };

	function handleRangeTime(e) {
		const { left, right } = e.currentTarget.getBoundingClientRect();
		$currentTimePercSt = (e.clientX - left) / (right - left);

		startTime = performance.now();
		lastPausedTime = $currentTimePercSt;
		if (isPlaying) {
			linePlayer?.stop();
			linePlayer = playLines();
		}
	}

	function playLoop() {
		if (!isPlaying) return;

		const delta = performance.now() - startTime;
		$currentTimePercSt = lastPausedTime + delta / 1000 / $durationSt;

		if ($currentTimePercSt >= 1) {
			$currentTimePercSt = 1;
			isPlaying = false;
			$currentTimePercSt = 0;
			return;
		}
		requestAnimationFrame(playLoop);
	}
	function toggleAudio() {
		isPlaying = !isPlaying;
		if (isPlaying) {
			linePlayer = playLines();

			lastPausedTime = $currentTimePercSt;
			startTime = performance.now();
			playLoop();
		} else {
			linePlayer?.stop();
		}
	}

	function handleKeyDown(e) {
		if (e.key !== ' ') return;
		toggleAudio();
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="play-container">
	<button on:click={toggleAudio}>
		<svg width="55" height="68" viewBox="0 0 55 68" fill="none" xmlns="http://www.w3.org/2000/svg">
			{#if !isPlaying}
				<path d="M55 34L2.38419e-07 68L2.38419e-07 0L55 34Z" fill="grey" />
			{:else}
				<rect width="15" height="68" fill="grey" />
				<rect x="40" width="15" height="68" fill="grey" />
			{/if}
		</svg>
	</button>
</div>

<div class="timeline">
	<div class="bar-container">
		<div on:click={handleRangeTime} class="bar" style="--time-perc: {$currentTimePercSt};" />
		<div class="times">
			{#each Array(10) as _, i}
				<span>{displayText((i / 10) * $durationSt)}</span>
			{/each}
		</div>
		<h3>Time (s)</h3>
	</div>
	<div class="time" on:input={handleChangeTime}>
		<input type="text" value="{displayText($currentTimeSt)}/{displayText($durationSt)}" />
	</div>
</div>

<style>
	.play-container {
		display: flex;
		align-items: flex-start;
	}
	.play-container svg {
		height: 16px;
	}
	button {
		height: 32px;
		font-size: 1.5em;
		color: #000a;
		width: 100%;
		border-radius: 4px;
		cursor: pointer;
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
		font-size: 12px;
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
		transition: 0.05s;
	}
</style>
