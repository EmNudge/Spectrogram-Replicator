<script>
  import SettingsMenu from './settings/Menu.svelte';
  import MenuManager from './MenuManager.svelte';
  import menu from './menu';

  let showSettings = false;
  menu.push({ name: 'Settings', action: () => showSettings = !showSettings })
</script>

{#if showSettings}
  <SettingsMenu on:close={() => showSettings = false} />
{/if}

<MenuManager {menu} />
