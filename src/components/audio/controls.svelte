<script>
  // svelte components
  import PlayButton from "./playButton.svelte";
  import Timeline from "./timeline.svelte";

  // audio API utils
  import { getSchedule, transformSchedule, TonePlayer } from "../../audio";

  // stores
  import { linesStore, canvasStore } from "stores/canvas";
  import { audioLengthStore } from "stores/audio";

  let tonePlayer = new TonePlayer(3);

  let timePerc = 0;
  let reqId;
  let startSkip = 0;

  let isPlaying = false;

  function getSchedules() {
    const schedules = [];
    for (const [_id, line] of $linesStore) {
      const schedule = getSchedule(line);

      schedules.push(schedule);
    }

    return schedules;
  }

  function updateTime() {
    timePerc = tonePlayer.percentage + (startSkip / $audioLengthStore);

    if (timePerc > 1) {
      isPlaying = false;
      timePerc = 0;
      startSkip = 0;
      return;
    }

    reqId = requestAnimationFrame(updateTime);
  }

  // since we use bind, isPlaying has not yet changed, but it will change itself
  // that means we are now a step right before isPlaying changed, so we are currently !isPlaying
  function togglePlay() {
    if (isPlaying) {
      tonePlayer.pause();
      cancelAnimationFrame(reqId);
    } else {
      const schedules = getSchedules();
      startSkip = $audioLengthStore * timePerc;
      const slicedSchedules = schedules.map(schedule => transformSchedule(schedule, startSkip));

      tonePlayer.play(slicedSchedules, startSkip);
      updateTime();
    }
  }
</script>

<PlayButton on:click={togglePlay} bind:isPlaying />

<Timeline bind:percentage={timePerc} />

