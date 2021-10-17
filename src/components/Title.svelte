<script>
	import { authorSt, titleSt } from '$stores/project'

	let isEditing = false;
</script>

<div class="title-gutter" />
<div class="title">
	<div class="text-container">
		<input 
			type="text"
			disabled={!isEditing}
			role="heading"
			placeholder="Project Title"
			bind:value={$titleSt} />
		<input 
			type="text"
			disabled={!isEditing}
			role="heading"
			placeholder="Project Author"
			bind:value={$authorSt} />
	</div>
	<div class="buttons">
		<button on:click={() => isEditing = !isEditing} class:active={isEditing}>
			<img src="/icons/pencil.svg" alt="pencil">
		</button>
	</div>
</div>

<style>
	.text-container {
		display: grid;
        grid-template-rows: 45px 1fr;
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
	button img {
		height: 12px;
		margin-left: 1px;
	}
	button:hover {
		opacity: 1;
		cursor: pointer;
	}
	button.active {
		opacity: 1;
		background: #0001;
	}
	input {
		text-align: left;
		width: 100%;
		border-radius: 6px;
		font-weight: bold;
		border: 1px solid #0003;
		background: none;
		margin: 0;
		padding: 0;
		color: #4f4f4f;
		font-family: 'Open Sans', sans-serif;
	}
    .text-container input:first-child {
		font-size: 2.15em;
		height: 3.5rem;
    }
    .text-container input:last-child {
		font-size: 1.5em;
		height: 1.6rem;
		font-weight: 400;
    }
    input:disabled {
		border: 1px solid transparent;
    }
</style>
