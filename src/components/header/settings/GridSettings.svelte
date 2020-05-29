<script>
  import { debugModeStore, showGridBG, gridDimStore, lightenOddGridStore } from "stores/canvas";
  import CheckBox from "@/components/util/CheckBox.svelte";
  import NumberInput from "@/components/util/NumberInput.svelte";

  let gridBGColumns = $gridDimStore[0]
  let gridBGRows = $gridDimStore[1];
  $: gridDimStore.update(() => [gridBGColumns, gridBGRows]);
</script>

<CheckBox title="Show Grid Background" bind:checked={$showGridBG} />
<br />
<NumberInput title="Grid Background Columns" bind:value={gridBGColumns} />
<NumberInput title="Grid Background Rows" bind:value={gridBGRows} />
<br />
<CheckBox title="Lighten Odd Lines" bind:checked={$lightenOddGridStore} />