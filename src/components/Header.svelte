<script>
  import Download from "./svg/Download.svelte";
  import Upload from "./svg/Upload.svelte";
  import Settings from "./svg/Settings.svelte";

  import SettingsMenu from './SettingsMenu.svelte'

  import { download } from '../utils';
  import { getOutput } from '../audio';

  function handleDownload() {
    const output = JSON.stringify(getOutput());
    download('Spectrogram.json', output);
  }

  let showSettings = false;
</script>

<style>
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--grey);
  }
  span {
    --size: 70px;
    height: var(--size);
    width: var(--size);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
  }
  span:hover {
    background: #0001;
    cursor: pointer;
  }
</style>

{#if showSettings}
  <SettingsMenu on:close={() => showSettings = false} />
{/if}

<header>
  <span>
    <Upload />
  </span>
  <span on:click={handleDownload}>
    <Download />
  </span>
  <span on:click={() => showSettings = true}>
    <Settings />
  </span>
</header>
