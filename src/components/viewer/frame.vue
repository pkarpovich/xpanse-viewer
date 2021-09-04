<template>
  <canvas ref="canvasRef" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Frame",
  props: {
    frame: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  beforeUpdate() {
    this.drawFrame(this.frame, this.width, this.height);
  },
  methods: {
    drawFrame(frame, width = frame.width, height = frame.height) {
      const canvas = this.$refs.canvasRef;

      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        frame,
        0,
        0,
        frame.width,
        frame.height,
        0,
        0,
        width,
        height
      );
    },
  },
});
</script>

<style scoped></style>
