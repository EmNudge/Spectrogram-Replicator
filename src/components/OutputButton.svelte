<script>
  import { download } from '../utils';
  import { getOutput } from '../audio';

  function handleDownload() {
    const output = JSON.stringify(getOutput());
    download('Spectrogram.json', output);
  }
</script>

<button on:click={handleDownload}>Download Output</button>