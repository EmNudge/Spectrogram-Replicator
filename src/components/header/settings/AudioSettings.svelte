<script>
  import { minFreqStore, maxFreqStore, audioLengthStore } from "stores/audio";
  import NumberInput from "@/components/Window/NumberInput.svelte";
</script>

<style>
  .inputs {
    padding: 5px;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 10px;
  }
</style>

<div class="inputs">
  <NumberInput title="Length (seconds)" bind:value={$audioLengthStore} />

  <NumberInput title="Min Frequency" bind:value={$minFreqStore} />

  <NumberInput title="Max Frequency" bind:value={$maxFreqStore} />
</div>
