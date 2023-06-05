<template>
  <div class="card mb-4 shadow-lg" style="width: 100%;">
    <div class="card-body p-4">
      <p class="card-text" style="white-space: pre-wrap;">{{props.data.comment}}</p>
      <hr/>
      <div class="d-flex justify-content-between">

        <p style="font-weight: 600;font-size: 16px;" class="mb-0">{{ props.data.first_name.toUpperCase() }} {{ props.data.last_name.toUpperCase() }}</p>
        <span class="text3">{{props.data.created_at}}</span>
      </div>

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