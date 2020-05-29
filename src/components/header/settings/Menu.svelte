<script>
  import Window from '@/components/Window.svelte';
  import Binder from '@/components/Binder.svelte';

  import AudioSettings from './AudioSettings.svelte'
  import GraphSettings from './GraphSettings.svelte'
  import GridSettings from './GridSettings.svelte'
  import ProjectSettings from './ProjectSettings.svelte'
  const tabs = [
    { name: 'Audio', component: AudioSettings },
    { name: 'Graph', component: GraphSettings },
    { name: 'Grid', component: GridSettings },
    { name: 'Project', component: ProjectSettings },
  ]
</script>

<Window on:close title="Settings" padding={false}>
  <Binder {tabs} />
</Window>