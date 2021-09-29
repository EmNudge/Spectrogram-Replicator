<script>
	let isEditing = false;
</script>

<div class="title-gutter" />
<div class="title">
	<div class="text-container">
		{#if isEditing}
			<input type="text" placeholder="Project Title" value="Spectrogram Replicator" />
			<input type="text" placeholder="Project Author" value="EmNudge" />
		{:else}
			<h1>Spectrogram Replicator</h1>
			<h2>EmNudge</h2>
		{/if}
	</div>
	<div class="buttons">
		<button on:click={() => isEditing = !isEditing}>
			<span> 🖉 </span>
		</button>
	</div>
</div>

<style>
	.text-container {
		display: grid;
        grid-template-rows: 60px 1fr;
		grid-gap: 10px;
	}
	.title {
		display: grid;
		grid-template-columns: 400px 1fr;
        height: 100px;
	}
	.buttons {
		padding-left: 20px;
		padding-top: 10px;
	}
	button {
		border: 1px solid #4f4f4fee;
        background: none;
		border-radius: 50%;
		padding: 4px;
		color: #4f4f4fee;
		width: 24px;
		height: 24px;
		opacity: 0.5;
		display: flex;
		align-items: center;
	}
	button:hover {
		opacity: 1;
		cursor: pointer;
	}
	h1 {
		font-size: 2.5em;
	}
	h1,
	h2 {
		margin: 0;
		color: #4f4f4f;
	}
    .text-container input:first-child {
        font-size: 2.5em;
    }
    .text-container input:last-child {
        font-size: 1.5em;
    }
    input {
        width: 100%;
        border: 1px solid #0003;
    }
</style>
