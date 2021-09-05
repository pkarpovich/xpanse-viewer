<template>
  <div
    v-for="item in frames"
    :key="item.id"
    :class="`frame-container ${
      currentFrameId === item.id ? 'frame-container--selected' : ''
    }`"
    @click="handleClick(item.id)"
  >
    <frame
      :id="item.id"
      :frame="item.frame"
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
    currentFrameId: {
      type: String,
      required: true,
    },
    framesInterval: {
      type: Number,
      required: true,
    },
  },
  components: {
    Frame,
  },
  emits: ["click", "stop-animation"],
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
