<script>
  import { getOutput } from '@/audio';
  import { download } from '@/utils';
  import { titleStore } from 'stores/project'

  function handleDownload() {
    const title = $titleStore.replace(' ', '-');
    const output = JSON.stringify(getOutput());
    download(`GENERIC-${title}.json`, output);
  }
</script>

<button on:click={handleDownload}>Download Generic Output</button>