<script>
  import Download from "../svg/Download.svelte";
  import Upload from "../svg/Upload.svelte";
  import Settings from "../svg/Settings.svelte";

  import SettingsMenu from './settings/Menu.svelte';
  import DownloadMenu from './download/Menu.svelte' ;
  import UploadMenu from './upload/Menu.svelte';

  let showSettings = false;
  let showDownload = false;
  let showUpload = false;
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
{#if showDownload}
  <DownloadMenu on:close={() => showDownload = false} />
{/if}
{#if showUpload}
  <UploadMenu on:close={() => showUpload = false} />
{/if}

<header>
  <span on:click={() => showUpload = !showUpload}>
    <Upload />
  </span>
  <span on:click={() => showDownload = !showDownload}>
    <Download />
  </span>
  <span on:click={() => showSettings = !showSettings}>
    <Settings />
  </span>
</header>
