<template>
  <frame :frame="currentFrame" :width="500" :height="300" />
  <frames-timeline :frames="frames" />
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
    FramesTimeline,
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
            image.onload = () => resolve(image);
            image.onerror = reject;
          })
      )
    );

    return {
      frames,
    };
  },
  mounted() {
    this.framesIntervalId = setInterval(
      this.setNextFrameIndex,
      FRAMES_INTERVAL_TIMEOUT
    );
  },
  beforeUnmount() {
    if (this.framesIntervalId) {
      this.stopFramesInterval();
    }
  },

  methods: {
    setNextFrameIndex() {
      const nextFrameIndex = this.currentFrameIndex + 1;

      this.currentFrameIndex =
        nextFrameIndex !== this.frames.length ? nextFrameIndex : 0;
    },
    stopFramesInterval() {
      clearInterval(this.framesIntervalId);
    },
  },
});
</script>

<style scoped></style>
