<template>
  <div
    v-for="item in timelineItems"
    :key="item.id"
    :class="`frame-container ${
      item.from <= currentFrameIndex && item.to >= currentFrameIndex
        ? 'frame-container--selected'
        : ''
    }`"
    @click="handleClick(item.from)"
  >
    <frame
      :id="item.id"
      :frame="item.preview"
      :frames-interval="framesInterval"
      @stop-animation="handleStopAnimation"
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
    currentFrameIndex: {
      type: Number,
      required: true,
    },
    framesInterval: {
      type: Number,
      required: true,
    },
    infoRanges: {
      type: Array,
      required: true,
    },
  },
  components: {
    Frame,
  },
  emits: ["click", "stop-animation"],
  computed: {
    timelineItems() {
      return this.infoRanges.map((r) => ({
        ...r,
        preview: this.frames?.[r.to]?.frame ?? null,
      }));
    },
  },
  methods: {
    handleClick(id) {
      this.$emit("click", id);
    },
    handleStopAnimation() {
      this.$emit("stop-animation");
    },
  },
});
</script>

<style scoped>
.container {
}

.frame-container {
  min-width: 30%;
  height: 65%;
  margin: 30px;
}

.frame-container--selected {
  height: 80%;
}
</style>
