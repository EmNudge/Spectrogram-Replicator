<script>
  import { titleStore, authorStore } from '../../../stores/project'
</script>

<style>
  label {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 5px;
  }
</style>

<label>
  <span>Title</span>
  <input type="text" bind:value={$titleStore} />
</label>

<br />

<label>
  <span>Author</span>
  <input type="text" bind:value={$authorStore} />
</label>