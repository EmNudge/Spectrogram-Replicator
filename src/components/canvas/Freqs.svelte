<script>
  import { minFreqStore, maxFreqStore } from "stores/audio";

  export let sections = 4;

  $: diff = ($maxFreqStore - $minFreqStore) / sections;
</script>

<style>
  div {
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(10px, 1fr));
  }
  span {
    font-size: 12px;
    text-align: right;
    /* border-top: 1px solid #000a; */
    margin-top: -8px;
  }
</style>

<div>
  {#each Array(sections) as _, i}
    <span>{$maxFreqStore - diff * i} Hz</span>
  {/each}
</div>
