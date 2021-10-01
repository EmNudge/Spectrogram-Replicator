<script>
    import { linesSt } from "../../stores/canvas";
</script>

<div class="row title-row">
	<h2>Line Manager</h2>
</div>

<div>Nothing here yet!</div>

<div>
    <h3>Lines</h3>
    <div class="lines">
        {#each $linesSt as line, i}
            <span>Line {i}</span>
        {/each}
    </div>
</div>

<style>
    .lines {
        display: grid;
        padding: 5px;
    }
    .lines span {
        padding: 10px;
        background: #0002;
    }
</style>