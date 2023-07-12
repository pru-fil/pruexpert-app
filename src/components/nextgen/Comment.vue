<template>
  <div class="card mb-4" style="width: 100%; box-shadow: 0 0.5rem 0.5rem rgba(0,0,0,.175) !important;">
    <div class="card-body p-4">
      <p class="card-text" style="white-space: pre-wrap; font-weight: 600; font-size: 16px;">{{props.data.comment}}</p>
      <hr/>
      <div class="d-flex justify-content-between">

        <p style="font-weight: 500;font-size: 14px;" class="mb-0">{{ props.data.first_name.toUpperCase() }}</p>
        <span style="font-size: 14px;" class="text3">{{props.data.created_at}}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: Object,
  })

</script>

<style>
.shadow-lg {

}
</style>