<template>
  <div class="row">
    <div class="col-md-3" v-for="(lbu, index) in lbus">
      <button type="button" @click="chooseLbu(lbu.code)" class="btn btn-outline-secondary btn-lg lbu-btn btn-block">{{ lbu.name }}</button>
    </div>
  </div>

</template>

<script>
import {AgGridVue} from "ag-grid-vue3";
import {reactive, onMounted, ref} from "vue";
import {useRouter, useRoute} from 'vue-router'
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import {Pie} from "vue-chartjs";
import {store} from "../store/store.js";

export default {
  name: "Lbus",
  components: {
    AgGridVue
  },
  setup() {
    const router = useRouter()
    const lbus = [
      {
        name: 'Pruexpert',
        code: 'sg'
      },
      {
        name: 'PAMB',
        code: 'ml'
      }
    ]; // Set rowData to Array of Objects, one Object per Row

    const chooseLbu = (param) => {
      store.lbu = param;
      router.push({name: 'learningPaths'});
    }
    return {
      lbus,
      chooseLbu,
    }

  },
}
</script>


<style scoped>
.lbu-btn {
  height: 120px !important;
  border-color: #6580e5 !important;
}

</style>