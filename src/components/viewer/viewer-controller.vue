<template>
  <frame
    :frame="currentFrame.frame"
    :id="currentFrame.id"
    :width="1100"
    :height="800"
    @stop-animation="stopAnimation"
    @change-frame="handleChangeFrame"
  />
  <!--  <frames-timeline :frames="frames" :currentFrameId="currentFrame.id" />-->
</template>

<script>
import { defineComponent } from "vue";
import { of } from "await-of";
import { api } from "boot/axios";

import Frame from "./frame";
import FramesTimeline from "./frames-timeline";

const FPS = 60;
const FRAMES_INTERVAL_TIMEOUT = 1000 / FPS;

export default defineComponent({
  name: "ViewerController",
  components: {
    // FramesTimeline,
    Frame,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentFrameIndex: 0,
      framesIntervalId: null,
    };
  },
  computed: {
    currentFrame() {
      return this.frames[this.currentFrameIndex];
    },
  },

  async setup(props) {
    const [{ data: manifest }] = await of(
      api.get(`frames/${props.name}/manifest.json`)
    );
    const frameUrls = manifest?.frames ?? [];
    const frames = await Promise.all(
      frameUrls.map(
        (f) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.src = f.file;
            image.onload = () => resolve({ id: f.id, frame: image });
            image.onerror = reject;
          })
      )
    );

    return {
      frames,
    };
  },
  mounted() {
    this.startAnimation();
  },
  beforeUnmount() {
    if (this.framesIntervalId) {
      this.stopAnimation();
    }
  },

  methods: {
    setNextFrameIndex(delta = 1) {
      const nextFrameIndex = this.currentFrameIndex + delta;

      this.currentFrameIndex =
        nextFrameIndex < 0
          ? this.frames.length - 1
          : nextFrameIndex <= this.frames.length
          ? nextFrameIndex
          : 0;
    },
    startAnimation() {
      this.framesIntervalId = setInterval(
        this.setNextFrameIndex,
        FRAMES_INTERVAL_TIMEOUT
      );
    },
    stopAnimation() {
      clearInterval(this.framesIntervalId);
    },
    handleChangeFrame({ delta }) {
      this.setNextFrameIndex(delta);
    },
  },
});
</script>

<style scoped></style>
