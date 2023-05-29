<template>
  <div class="card mb-2" style="width: 100%;">
    <div class="card-body">
      <div class="d-flex justify-content-between py-1 pt-2">
        <p class="card-text">{{props.data.comment}}</p>
        <span class="text3">{{props.data.created_at}}</span>
      </div>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ props.data.first_name }} {{ props.data.last_name }}</h6>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: Object,
  })

</script>

<style scoped>

</style>