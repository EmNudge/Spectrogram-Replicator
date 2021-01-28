<script>
  import { 
    debugModeStore, gridBGOpacityStore, canvasWidthStore,
    showGridBG, gridDimStore, lightenOddGridStore 
  } from "../../../stores/canvas";
  import CheckBox from "../../Window/CheckBox.svelte";
  import NumberInput from "../../Window/NumberInput.svelte";
  import Title from "../../Window/Title.svelte";

  let gridBGColumns = $gridDimStore[0]
  let gridBGRows = $gridDimStore[1];
  $: gridDimStore.update(() => [gridBGColumns, gridBGRows]);
</script>


<Title>General</Title>
<CheckBox title="Debug Mode" bind:checked={$debugModeStore} />
<br>
<NumberInput title="BG Image Opacity" bind:value={$gridBGOpacityStore} step={.05} />
<br>
<NumberInput title="Canvas Width" bind:value={$canvasWidthStore} step={20} />

<br />
<br />
<Title>Grid</Title>
<CheckBox title="Show Grid" bind:checked={$showGridBG} />
<br />
<NumberInput title="Columns" bind:value={gridBGColumns} />
<NumberInput title="Rows" bind:value={gridBGRows} />
<br />
<CheckBox title="Lighten Odd Lines" bind:checked={$lightenOddGridStore} />

