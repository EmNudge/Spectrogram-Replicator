<script>
  import { debugModeStore, gridBGOpacityStore, canvasWidthStore } from "stores/canvas";
  import CheckBox from "@/components/Window/CheckBox.svelte";
  import NumberInput from "@/components/Window/NumberInput.svelte";
</script>


<CheckBox title="Debug Mode" bind:checked={$debugModeStore} />
<br>
<NumberInput title="BG Image Opacity" bind:value={$gridBGOpacityStore} step={.05} />
<br>
<NumberInput title="Canvas Width" bind:value={$canvasWidthStore} step={20} />
