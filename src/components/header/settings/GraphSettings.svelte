<script>
  import { debugModeStore, showGridBG } from "stores/canvas";
  import CheckBox from "@/components/util/CheckBox.svelte";
</script>

<CheckBox title="Debug Mode" bind:checked={$debugModeStore} />
<br />
<CheckBox title="Show Grid Background" bind:checked={$showGridBG} />
