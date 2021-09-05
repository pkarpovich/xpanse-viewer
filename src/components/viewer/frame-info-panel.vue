<template>
  <div class="container">
    <slot>
      <div>No Data</div>
    </slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "frame-info-panel",
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  padding: 30px;
  border-radius: 30px;
  user-select: none;
}
</style>
