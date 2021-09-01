<template>
  <q-page class="flex flex-center">
    <viewer />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Viewer from "../components/viewer/viewer";

export default defineComponent({
  name: "PageIndex",
  components: {
    Viewer,
  },
});
</script>
