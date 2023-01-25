<script>
import Reports from "../components/Reports.vue";
export default {
  components: {Reports}
}

</script>

<template>
  <main>
    <Reports />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
