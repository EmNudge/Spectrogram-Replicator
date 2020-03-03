<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleFile(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    dispatch('file', { url });
  }
</script>

<style>
  label {
    padding: 5px 15px;
    background: #eee;
    box-shadow: 1px 1px 3px 0 grey;
    display: inline-block;
  }
  label:hover {
    cursor: pointer;
  }
  input {
    height: 0;
    width: 0;
    display: none;
    outline: none;
  }
</style>

<label>
  Pick File
  <input type="file" on:input={handleFile} />
</label>
