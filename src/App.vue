<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>
