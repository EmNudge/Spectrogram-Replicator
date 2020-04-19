<script>
  import Window from '@/components/Window.svelte';
  // import FilePicker from '@/components/FilePicker.svelte';
  import { setProject } from '@/utils';

  async function handleFile(e) {
    const file = e.target.files[0];
    const text = await file.text();
    setProject(JSON.parse(text));
  }
</script>

<Window on:close title="Upload">
  <p>Import project file:</p>
  <input type="file" on:input={handleFile} />
</Window>