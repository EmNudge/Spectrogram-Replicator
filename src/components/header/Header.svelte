<script>
  import SettingsMenu from './settings/Menu.svelte';
  import Toolbar from 'svelte-toolbar';
  import menu from './menu';

  let showSettings = false;
  menu.push({ name: 'Settings', action: () => showSettings = !showSettings });
  menu.push({ name: 'About', children: [
    { 
      name: 'File An Issue', 
      action: () => window.open('https://github.com/EmNudge/Spectrogram-Replicator/issues/new') 
    },
    {
      name: 'About Creator', action: () => window.open('https://kipperman.co')
    }
  ]})
</script>

{#if showSettings}
  <SettingsMenu on:close={() => showSettings = false} />
{/if}

<Toolbar {menu} />
