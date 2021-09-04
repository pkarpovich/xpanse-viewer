<template>
  <q-page class="flex flex-center">
    <suspense>
      <viewer name="stuttgart-pump" />
    </suspense>
  </q-page>
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
