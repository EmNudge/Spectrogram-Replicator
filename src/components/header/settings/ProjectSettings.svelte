<script>
  import { titleStore, authorStore } from 'stores/project'
  import TextInput from "@/components/Window/TextInput.svelte";
</script>

<TextInput title="Title" bind:value={$titleStore} />
<br />
<TextInput title="Author" bind:value={$authorStore} />
