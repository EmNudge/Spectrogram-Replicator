<script>
  import { debugModeStore } from "stores/canvas";
  import CheckBox from "@/components/util/CheckBox.svelte";
  import NumberInput from "@/components/util/NumberInput.svelte";

</script>

<CheckBox title="Debug Mode" bind:checked={$debugModeStore} />