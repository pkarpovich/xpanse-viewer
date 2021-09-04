<template>
  <suspense v-if="frameUrls.length > 0" @resolve="handlePreloadFrames">
    <template #default>
      <viewer :frameUrls="frameUrls" :currentFrameIndex="currentFrameIndex" />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>

<script>
import { defineComponent } from "vue";
import { of } from "await-of";
import { api } from "boot/axios";

import Viewer from "./viewer";

const FPS = 60;
const FRAMES_INTERVAL_TIMEOUT = 1000 / FPS;

export default defineComponent({
  name: "ViewerController",
  components: {
    Viewer,
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

  async setup(props) {
    const [{ data: manifest }] = await of(
      api.get(`frames/${props.name}/manifest.json`)
    );

    return {
      frameUrls: manifest?.frames ?? [],
    };
  },
  beforeUnmount() {
    if (this.framesIntervalId) {
      this.stopFramesInterval();
    }
  },

  methods: {
    handlePreloadFrames() {
      this.framesIntervalId = setInterval(
        this.setNextFrameIndex,
        FRAMES_INTERVAL_TIMEOUT
      );
    },
    setNextFrameIndex() {
      const nextFrameIndex = this.currentFrameIndex + 1;

      this.currentFrameIndex =
        nextFrameIndex !== this.frameUrls.length ? nextFrameIndex : 0;
    },
    stopFramesInterval() {
      clearInterval(this.framesIntervalId);
    },
  },
});
</script>

<style scoped></style>
