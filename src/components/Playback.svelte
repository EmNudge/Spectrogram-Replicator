<script lang="ts">
	let time = 0.5;
	let totalTime = 234;

	const displayText = (secs: number) => `${Math.floor(secs / 60)}:${Math.floor(secs) % 60}`;

    function changeTime(e) {
        const { left, right } = e.currentTarget.getBoundingClientRect();
        time = (e.clientX - left) / (right - left);
        console.log((e.clientX - left), (right - e.clientX), time)
    }
</script>

<div class="play-container">
	<button>➤</button>
</div>
<div class="timeline">
	<div on:click={changeTime} class="bar" style="--time-perc: {time};" />
	<input type="text" value="{displayText(totalTime * time)}/{displayText(totalTime)}" />
</div>

<style>
    .play-container {
        height: 36px;
    }
	button {
        height: 36px;
        font-size: 1.5em;
        color: #000a;
		width: 100%;
        border-radius: 4px;
	}
	.timeline {
		display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 5px;
	}
	input {
		width: 80px;
	}
	.bar {
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
