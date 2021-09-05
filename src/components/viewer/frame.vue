<template>
  <canvas
    style="border: black 1px solid"
    ref="canvasRef"
    :id="id"
    @mousemove="handleMouseMove"
    @mousedown="handleMouseDown"
  />
</template>

<script>
import { defineComponent } from "vue";
import { throttle } from "lodash-es";

const THROTTLE_WAIT = 16;

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
    id: {
      type: String,
    },
  },
  data() {
    return {
      ctx: null,
    };
  },
  emits: ["stop-animation", "change-frame"],
  mounted() {
    const canvas = this.$refs.canvasRef;

    this.ctx = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;

    this.drawFrame(this.frame, this.width, this.height);
  },
  beforeUpdate() {
    requestAnimationFrame(this.drawFrame(this.frame, this.width, this.height));
  },
  methods: {
    drawFrame(frame, width = frame.width, height = frame.height) {
      return () => {
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.drawImage(
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
      };
    },
    handleMouseMove: throttle(function (e) {
      if (e.buttons === 1) {
        this.$emit("change-frame", {
          delta: e.movementX,
        });
      }
    }, THROTTLE_WAIT),
    handleMouseDown(e) {
      this.$emit("stop-animation");
    },
  },
});
</script>

<style scoped></style>
