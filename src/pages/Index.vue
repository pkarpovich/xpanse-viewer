<template>
  <suspense>
    <template #default>
      <viewer name="stuttgart-pump" :info-ranges="infoRanges" />
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
  data() {
    return {
      infoRanges: [
        {
          from: 0,
          to: 215,
          template:
            "<div><div>From 0 to 215</div><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores autem cum, eum ex expedita inventore ipsa ipsum minima molestiae neque nisi nulla perspiciatis quasi sint sit unde veniam veritatis voluptate.</div></div>",
        },
        {
          from: 216,
          to: 500,
          template:
            "<div><div>From 216 to 500</div><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores autem cum, eum ex expedita inventore ipsa ipsum minima molestiae neque nisi nulla perspiciatis quasi sint sit unde veniam veritatis voluptate.</div></div>",
        },
        {
          from: 501,
          to: 719,
          template:
            "<div><div>From 501 to 720</div><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores autem cum, eum ex expedita inventore ipsa ipsum minima molestiae neque nisi nulla perspiciatis quasi sint sit unde veniam veritatis voluptate.</div></div>",
        },
      ],
    };
  },
});
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
</style>
