<script>
  export let isPlaying = false;

  function toggle() {
    isPlaying = !isPlaying;
  }
</script>

<style>
  .container {
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--grey);
    border-radius: 4px;
  }

  .btn {
    width: 11px;
    height: 0;
  }
  .playing {
    position: relative;
    right: -4px;
    width: 11px;
    border-width: 7px 7px 7px 12px;
    border-style: solid;
    border-color: transparent transparent transparent #000;

    margin-right: -9px;
  }

  .paused {
    height: 13px;
    position: relative;
  }
  .paused::after,
  .paused::before {
    content: "";
    position: absolute;
    width: 3px;
    top: 0px;
    bottom: 0px;
    left: 8px;
    background: #000;
  }
  .paused::before {
    left: 0px;
  }
</style>

<div class="container" on:click on:click={toggle}>
  <span class="btn" class:playing={!isPlaying} class:paused={isPlaying} />
</div>
