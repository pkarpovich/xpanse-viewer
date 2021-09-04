<template>
  <canvas ref="canvasRef" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Viewer",
  props: {
    frameUrls: {
      type: Array,
      required: true,
    },
    currentFrameIndex: {
      type: Number,
      required: true,
    },
  },
  async setup(props) {
    const frames = await Promise.all(
      props.frameUrls.map(
        (f) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.src = f.file;
            image.onload = () => resolve(image);
            image.onerror = reject;
          })
      )
    );

    return {
      frames,
    };
  },
  watch: {
    currentFrameIndex(index) {
      const canvas = this.$refs.canvasRef;
      const nextFrame = this.frames[index];

      const ctx = canvas.getContext("2d");
      canvas.width = nextFrame.width;
      canvas.height = nextFrame.height;
      ctx.drawImage(nextFrame, 0, 0);
    },
  },
});
</script>

<style scoped></style>
