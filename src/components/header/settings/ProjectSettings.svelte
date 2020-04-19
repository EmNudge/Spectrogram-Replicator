<script>
  import { titleStore, authorStore } from 'stores/project'
  import TextInput from "@/components/util/TextInput.svelte";
</script>

<TextInput title="Title" bind:value={$titleStore} />
<br />
<TextInput title="Author" bind:value={$authorStore} />
