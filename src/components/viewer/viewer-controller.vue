<template>
  <viewer />
</template>

<script>
import { defineComponent } from "vue";
import Viewer from './viewer'

export default defineComponent({
  name: "ViewerController",
  components: {
    Viewer
  },
  beforeMount() {
    console.log('controller');
  }
});
</script>

<style scoped>

</style>
