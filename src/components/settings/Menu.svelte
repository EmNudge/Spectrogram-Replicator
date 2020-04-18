<script>
  import Window from '../Window.svelte';
  import Binder from '../Binder.svelte';

  import AudioSettings from './AudioSettings.svelte'
  import GraphSettings from './GraphSettings.svelte'
  const tabs = [
    { name: 'Audio', component: AudioSettings },
    { name: 'Graph', component: GraphSettings },
  ]
</script>

<Window on:close title="Settings">
  <Binder {tabs} />
</Window>