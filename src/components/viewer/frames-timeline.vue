<template>
  <div>Timeline</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "frames-timeline",
  props: {
    frames: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped></style>
