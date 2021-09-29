<script>
	import { tick } from "svelte";

	let title = 'Spectrogram Replicator';
	let author = 'EmNudge';

	let isEditing = false;
	
	const handleDoubleClick = async (e) => {
		isEditing = true;
		await tick();
		e.target.focus();
	}
</script>

<div class="title-gutter" />
<div class="title">
	<div class="text-container">
		<input 
			type="text"
			disabled={!isEditing}
			role="heading"
			placeholder="Project Title"
			bind:value={title} />
		<input 
			type="text"
			disabled={!isEditing}
			role="heading"
			placeholder="Project Author"
			bind:value={author} />
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
	input {
		width: 100%;
		border-radius: 6px;
		font-weight: bold;
		border: 1px solid #0003;
		background: none;
		margin: 0;
		padding: 0;
		color: #4f4f4f;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
    .text-container input:first-child {
		font-size: 2.5em;
		height: 2.6rem;
    }
    .text-container input:last-child {
		font-size: 1.5em;
		height: 1.6rem;
    }
    input:disabled {
		border: 1px solid transparent;
    }
</style>
