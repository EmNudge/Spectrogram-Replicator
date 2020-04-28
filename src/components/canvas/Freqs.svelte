<script>
  import { minFreqStore, maxFreqStore } from "stores/audio";
  import { gridDimStore } from "stores/canvas";

  $: sections = Math.ceil($gridDimStore[1]);

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
    margin-top: -8px;
    opacity: .25;
  }
  span.major {
    opacity: 1;
  }
</style>

<div>
  {#each Array(sections) as _, i}
    <span class:major={sections % 2 !== i % 2}>{($maxFreqStore - diff * i).toFixed(1)} Hz</span>
  {/each}
</div>
