<template>
  <div class="main-part-container">
    <div class="info-panel-container">
      <frame-info-panel>
        <div v-if="!!frameInfoPanel" v-html="frameInfoPanel.template"></div>
      </frame-info-panel>
    </div>
    <div class="frame-container">
      <frame
        :frame="currentFrame.frame"
        :id="currentFrame.id"
        :framesInterval="framesInterval"
        @stop-animation="stopAnimation"
        @change-frame="handleChangeFrame"
        @start-inertia="startInertia"
      />
    </div>
  </div>
  <div class="timeline-container" ref="timelineContainer">
    <frames-timeline
      :frames="frames"
      :info-ranges="infoRanges"
      :currentFrameIndex="currentFrameIndex"
      :framesInterval="framesInterval"
      @click="handleFrameClick"
      @stop-animation="stopAnimation"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { of } from "await-of";
import { api } from "boot/axios";

import Frame from "./frame";
import FrameInfoPanel from "./frame-info-panel";
import FramesTimeline from "./frames-timeline";

const FPS = 60;
const FRAMES_INTERVAL = 1000 / FPS;

export default defineComponent({
  name: "ViewerController",
  components: {
    FramesTimeline,
    FrameInfoPanel,
    Frame,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    infoRanges: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      prevDelta: null,
      currentFrameIndex: 0,
      framesIntervalId: null,
      framesInterval: FRAMES_INTERVAL,
    };
  },
  computed: {
    currentFrame() {
      return this.frames[this.currentFrameIndex];
    },
    frameInfoPanel() {
      return this.infoRanges?.find(
        (i) =>
          i.from <= this.currentFrameIndex && i.to >= this.currentFrameIndex
      );
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
      return () => {
        const nextFrameIndex = this.currentFrameIndex + delta;

        this.currentFrameIndex =
          nextFrameIndex < 0
            ? this.frames.length - 1
            : nextFrameIndex < this.frames.length
            ? nextFrameIndex
            : 0;
      };
    },
    startAnimation() {
      this.framesIntervalId = setInterval(
        this.setNextFrameIndex(),
        this.framesInterval
      );
    },
    startInertia() {
      if (!this.prevDelta) {
        return;
      }

      const inertiaIntervalId = setInterval(
        this.setNextFrameIndex(this.prevDelta > 0 ? 2 : -2),
        this.framesInterval
      );

      setTimeout(() => {
        clearInterval(inertiaIntervalId);
        this.prevDelta = null;
      }, 400);
    },
    stopAnimation() {
      clearInterval(this.framesIntervalId);
      this.framesIntervalId = null;
    },
    handleChangeFrame({ delta }) {
      this.prevDelta = delta;
      this.setNextFrameIndex(delta)();
    },
    handleFrameClick(index) {
      this.prevDelta = 1;

      this.stopAnimation();
      this.setNextFrameIndex(index - this.currentFrameIndex)();
      this.startInertia();
    },
  },
});
</script>

<style scoped>
.main-part-container {
  width: 100%;
  height: 70%;
  display: flex;
}

.timeline-container {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
  padding: 30px;
}

.frame-container {
  display: flex;
  width: 70%;
  height: 100%;
  padding: 30px;
}

.info-panel-container {
  width: 30%;
  padding: 30px;
}
</style>
