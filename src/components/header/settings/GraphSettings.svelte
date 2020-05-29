<script>
  import { debugModeStore, gridBGOpacityStore } from "stores/canvas";
  import CheckBox from "@/components/util/CheckBox.svelte";
  import NumberInput from "@/components/util/NumberInput.svelte";
  $: console.log($gridBGOpacityStore)
</script>

<CheckBox title="Debug Mode" bind:checked={$debugModeStore} />
<br>
<NumberInput title="BG Image Opacity" bind:value={$gridBGOpacityStore} step={.05} />