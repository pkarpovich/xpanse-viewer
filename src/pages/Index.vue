<template>
  <q-page class="flex flex-center">
    <suspense>
      <template #default>
        <viewer name="stuttgart-pump" />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
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
