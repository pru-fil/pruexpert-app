<script>
import Comment from "./Comment.vue";
</script>

<template>
  <div class="container py-5 h-75">
    <div class="text-center mb-4">
      <h1>Check Out What Fellow Peers Have To Say!</h1>
      <p>Total Comments: {{data.value.length}}</p>
    </div>
    <div  v-for="(item, index) in data.value">
      <Comment :data="item" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from "axios";
import { useRoute } from 'vue-router'

const data = reactive({value: []});

onMounted(() => {
  const router = useRoute();

  axios({
    method: 'get',
    url: 'https://shark-app-pjbx4.ondigitalocean.app/api/comments',
    // url: 'http://localhost:8001/api/comments',
    params: {
      // username: router.query.username,
      // password: password.value,
      // title: router.query.title,
      moduleId: router.query.moduleId,
      // moduleId: 2036359,
      lbu: 'PAMB',
    }
  }).then((resp) => {
    data.value = resp.data;
    console.log(data);
  })
})
</script>

<style scoped>

</style>