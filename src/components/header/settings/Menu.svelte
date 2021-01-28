<script>
  import Binder from '../../Window/Binder.svelte';

  import AudioSettings from './AudioSettings.svelte';
  import GraphSettings from './GraphSettings.svelte';
  import ProjectSettings from './ProjectSettings.svelte';
  
  const tabs = [
    { name: 'Audio', component: AudioSettings },
    { name: 'Graph', component: GraphSettings },
    { name: 'Project', component: ProjectSettings },
  ];
</script>

<Binder on:close title="Settings" {tabs} />