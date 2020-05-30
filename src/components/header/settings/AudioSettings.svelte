<script>
  import { minFreqStore, maxFreqStore, audioLengthStore } from "stores/audio";
  import NumberInput from "@/components/Window/NumberInput.svelte";
  import Title from "@/components/Window/Title.svelte";
</script>

<Title>General</Title>
<NumberInput title="Length (seconds)" bind:value={$audioLengthStore} />

<br/>
<Title>Frequency</Title>
<NumberInput title="Min" bind:value={$minFreqStore} />

<NumberInput title="Max" bind:value={$maxFreqStore} />
