<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>
<template>
  <AppHeader />
  <div class="container mt-3">
    <router-view />
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
