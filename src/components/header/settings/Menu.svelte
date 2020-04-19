<script>
  import Window from '@/components/Window.svelte';
  import Binder from '@/components/Binder.svelte';

  import AudioSettings from './AudioSettings.svelte'
  import GraphSettings from './GraphSettings.svelte'
  import ProjectSettings from './ProjectSettings.svelte'
  const tabs = [
    { name: 'Audio', component: AudioSettings },
    { name: 'Graph', component: GraphSettings },
    { name: 'Project', component: ProjectSettings },
  ]
</script>

<Window on:close title="Settings">
  <Binder {tabs} />
</Window>