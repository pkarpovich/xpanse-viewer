<template>
  <div class="timeline-container" ref="timelineContainer">
    <frame
      v-for="item in frames"
      :key="item.id"
      :id="item.id"
      :frame="item.frame"
      :width="300"
      :height="250"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Frame from "./frame";

export default defineComponent({
  name: "frames-timeline",
  props: {
    frames: {
      type: Array,
      required: true,
    },
    currentFrameId: {
      type: String,
      required: true,
    },
  },
  components: {
    Frame,
  },
  watch: {
    currentFrameId(id) {
      this.$refs.timelineContainer.querySelector(`#${id}`)?.scrollIntoView();
    },
  },
});
</script>

<style>
.timeline-container {
  display: flex;
  flex-direction: row;
  overflow: scroll;
}
</style>
