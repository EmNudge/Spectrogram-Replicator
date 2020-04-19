<script>
  import { getProject, download } from '@/utils';
  import { titleStore } from 'stores/project'

  function handleDownload() {
    const title = $titleStore.replace(' ', '-');
    const output = JSON.stringify(getProject());
    download(`PROJECT-${title}.json`, output);
  }
</script>

<button on:click={handleDownload}>Download Project</button>