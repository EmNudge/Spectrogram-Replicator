<script>
  import SettingsMenu from './settings/Menu.svelte';
  import Toolbar from 'svelte-toolbar';
  import menu from './menu';

  let showSettings = false;
  menu.push({ name: 'Settings', action: () => showSettings = !showSettings })
</script>

{#if showSettings}
  <SettingsMenu on:close={() => showSettings = false} />
{/if}

<Toolbar {menu} />
