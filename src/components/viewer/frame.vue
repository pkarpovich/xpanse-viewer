<template>
  <div class="canvas-container" ref="canvasContainerRef">
    <canvas
      ref="canvasRef"
      :id="id"
      @mousemove="handleMouseMove()($event)"
      @mousedown="handleMouseDown"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { throttle } from "lodash-es";

export default defineComponent({
  name: "Frame",
  props: {
    frame: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
    },
    framesInterval: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      resizeObserver: null,
      ctx: null,
      width: 0,
      height: 0,
    };
  },
  emits: ["stop-animation", "change-frame"],
  mounted() {
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this.$refs.canvasContainerRef);

    this.ctx = this.$refs.canvasRef.getContext("2d");

    this.drawFrame(this.frame)();
  },
  beforeUpdate() {
    requestAnimationFrame(this.drawFrame(this.frame));
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    drawFrame(frame) {
      return () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(
          frame,
          0,
          0,
          frame.width,
          frame.height,
          0,
          0,
          this.width,
          this.height
        );
      };
    },
    handleMouseDown() {
      this.$emit("stop-animation");
    },
    handleMouseMove() {
      return throttle((e) => {
        if (e.buttons === 1) {
          this.$emit("change-frame", {
            delta: e.movementX,
          });
        }
      }, this.framesInterval);
    },
    handleResize(entries) {
      const [container] = entries;
      const { width, height } = container.contentRect;
      const canvas = this.$refs.canvasRef;

      this.width = width;
      this.height = height;

      canvas.width = this.width;
      canvas.height = this.height;
    },
  },
});
</script>

<style scoped>
canvas {
  width: 100%;
  object-fit: contain;
  border: black 1px solid;
}

.canvas-container {
  width: 100%;
  height: 100%;
}
</style>
