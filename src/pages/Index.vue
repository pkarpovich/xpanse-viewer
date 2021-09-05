<template>
  <suspense>
    <template #default>
      <viewer name="stuttgart-pump" />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    Viewer: defineAsyncComponent(() =>
      import("../components/viewer/viewer-controller")
    ),
  },
});
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
</style>
