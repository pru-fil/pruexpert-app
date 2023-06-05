<script>
import Comment from "./Comment.vue";
</script>

<template>
  <div class="container py-5 h-75">
    <div class="text-center mb-4">
      <p style="font-weight: 600; font-size: 26px; color: #DA291C">CHECK OUT WHAT FELLOW PEERS HAVE TO SAY!</p>
      <hr/>
      <p style="font-weight: 600;font-size: 16px;">TOTAL COMMENTS: {{data.value.total}}</p>
    </div>
    <div  v-for="(item, index) in data.value.data">
      <Comment :data="item" />
    </div>
    <Bootstrap5Pagination
        size="large"
        align="center"
        :data="data.value"
        @pagination-change-page="getComments"
    />
  </div>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from "axios";
import { useRoute } from 'vue-router'
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
const router = useRoute();
const data = reactive({value: []});
const moduleId = router.query.moduleId;

onMounted(() => {
  getComments(1)
})

const getComments = (page) => {
  axios({
    method: 'get',
    url: 'https://shark-app-pjbx4.ondigitalocean.app/api/comments',
    // url: 'http://localhost:8001/api/comments',
    params: {
      page: page,
      // password: password.value,
      // title: router.query.title,
      moduleId: moduleId,
      // moduleId: 2036359,
      lbu: 'PAMB',
    }
  }).then((resp) => {
    data.value = resp.data;
    console.log(data.value);
  })
}
</script>

<style>
.page-item.active .page-link {
  background-color: #ED1B2E !important;
}
</style>