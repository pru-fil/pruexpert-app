<template>
  <div class="pb-5">
    <ag-grid-vue
        class="ag-theme-alpine"
        style="height: 800px"
        :columnDefs="columnDefs"
        :rowData="rowData.value"
        :defaultColDef="defaultColDef"
        rowSelection="multiple"
        animateRows="true"
        @grid-ready="onGridReady"
    > </ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { Pie } from 'vue-chartjs'
import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";

export default {
  name: "Reports",
  props: {
    id: String,
    name: String,
    assignedPeople: Number,
    peopleCompleted: Number
  },
  components: {
    AgGridVue,
    Pie
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const gridApi = ref();
    const gridColumnApi = ref();
    const loaded = reactive({state: false});
    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;

      getComments()
    };

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = ref([
        {
          headerName: 'Video',
          field: 'video_no',
        },
        {
          headerName: 'No. of learners who watched a video and completed an activity',
          headerClass: "ag-header-group-cell",
          children: [
            { field: 'PAMB', width: 140, flex: 1},
            { field: 'PLUK', width: 140, flex: 1},
            { field: 'PLAI', width: 140, flex: 1},
            { field: 'PMLI', width: 140, flex: 1},
            { field: 'PCLA', width: 140, flex: 1},
            { field: 'PHKL', width: 140, flex: 1},
            { field: 'total', width: 140, flex: 1},
          ]
        }
      ],
    );

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1,
      resizable: true,
    };

    const getComments = () => {
      axios({
        method: 'get',
        url: 'https://shark-app-pjbx4.ondigitalocean.app/api/nexGenReports',
        // url: 'http://localhost:8001/api/nexGenReports',
        params: {
          // page: page,
          // password: password.value,
          // title: router.query.title,
          // moduleId: moduleId,
          // moduleId: 2036359,
          // type: router.query.type,
        }
      }).then((resp) => {
        rowData.value = resp.data;
      })
    }
    // Example load data from sever
    onMounted(() => {
    });

    return {
      onGridReady,
      columnDefs,
      defaultColDef,
      rowData
    };
  },
}
</script>

<style>
.ag-header-group-cell{
  text-align: center;
}
</style>