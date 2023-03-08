<template>
  <div class="position-absolute top-0 end-0 align-items-center">
    Last Synced:
    {{lastSynced}}
    <button class="btn btn-warning" @click="resync"> Sync</button>
  </div>
  <button @click="$router.back()">
    Back
  </button>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12 fw fs-2 text-center">
        {{lbu }} Learning Paths
      </div>
      <div class="">

      </div>
    </div>
  </div>
  <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 800px"
      :columnDefs="columnDefs.value"
      :rowData="rowData.value"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @row-clicked="rowClicked"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
  > </ag-grid-vue>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import {store} from "../store/store.js";
export default {
  name: "LearningPaths",
  components: {
    AgGridVue,
    Pie
  },
  setup() {
    const router = useRouter();
    const lastSynced = ref(null);
    const lbu = ref(null);
    const gridApi = ref(null); // Optional - for accessing Grid's API

    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };


    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { headerName: "Learning Path Name", field: "Name", sizeColumnsToFit: true},
        { headerName: "Assigned User", field: "assignedPeople", maxWidth: 180},
        { headerName: "User Completed", field: "peopleCompleted", maxWidth: 200 },
        { headerName: "% completed", field: "completedPercent", maxWidth: 160 },
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    };
    const resync = () => {
      localStorage.removeItem(lbu.value);
      mounted();
    }

    const mounted = () => {
      lbu.value = store.lbu == 'sg' ? 'Pruexpert' : 'PAMB';
      let coursesData;
      if (localStorage.getItem(lbu.value) === null) {
        // fetch(`http://localhost:8001/api/learningPaths?` + new URLSearchParams({
        //   lbu: store.lbu
        // }), {
          fetch(`https://shark-app-pjbx4.ondigitalocean.app/api/learningPaths?` + new URLSearchParams({
          lbu: store.lbu
        }), {
          method: 'GET'
        })
            .then(resp => resp.json())
            .then((d) => {
              localStorage.setItem(lbu.value, JSON.stringify(d))
              let sync =  JSON.parse(localStorage.getItem('sync'));

              if (sync === null) {
                console.log("true");
                let sync = {
                  [lbu.value]:new Date().toLocaleString('en-SG')
                }
                lastSynced.value = sync[lbu.value];
                localStorage.setItem('sync', JSON.stringify(sync))
              } else {
                sync[lbu.value] = new Date().toLocaleString('en-SG');
                lastSynced.value = sync[lbu.value];
                localStorage.setItem('sync', JSON.stringify(sync))
              }


              rowData.value = d;
            })
      } else {
        rowData.value = JSON.parse(localStorage.getItem(lbu.value))
        let sync =  JSON.parse(localStorage.getItem('sync'));
        lastSynced.value = sync[lbu.value];
      }
    }

    // Example load data from sever
    onMounted(() => {
      mounted();
    });

    return {
      onGridReady,
      resync,
      lastSynced,
      lbu,
      store,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked: (event) => { // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
      rowClicked: (data) => {
        console.log(data.data.Id);
        router.push({name: 'reports', params: {
            id: data.data.Id,
            name: data.data.Name,
            ap: data.data.assignedPeople,
            cp: data.data.peopleCompleted,
          }})
      },
      deselectRows: () =>{
        gridApi.value.deselectAll()
      }
    };
  },
}
</script>

<style scoped>

</style>