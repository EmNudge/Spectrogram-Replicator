<script>
  import Window from '../../Window.svelte';
  import Binder from '../../Binder.svelte';

  import GenericOutput from './GenericOutput.svelte'
  import ProjectOutput from './ProjectOutput.svelte'
  const tabs = [
    { name: 'Generic', component: GenericOutput },
    { name: 'Project', component: ProjectOutput },
  ]
</script>

<Window on:close title="Download Output">
  <Binder {tabs} />
</Window>