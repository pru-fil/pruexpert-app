<template>

  <div class="container">
    <div class="row align-items-center">
      <div class="col-9">
        <div class="row">
          <div class="row">
            <div class="col-12">
              <p class="text-center fw-bold fs-3">
                [PAMB EN 1.0] Boosting Agent Productivity With PRULeads
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="text-start fs-4">
                Total People Assigned:
              </p>
            </div>
            <div class="col-md-8">
              <p class="text-left fw-bold fs-4">
                17
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="text-start fs-4">
                People Completed %:
              </p>
            </div>
            <div class="col-md-8">
              <p class="text-left fw-bold fs-4">
                {{number3}} %
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <Pie v-if="loaded.state" :data="chartData" />
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
import usersData from "../assets/dummy/users.json"
import coursesData from "../assets/dummy/customCourse.json"

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import {authHeader} from "../_helpers"; // Optional theme CSS
export default {
  name: "Reports",
  components: {
    AgGridVue,
    Pie
  },
  setup() {
    const router = useRouter()
    const gridApi = ref(null); // Optional - for accessing Grid's API

    const number1 = 2;
    const number2 = 14;
    const number3 = ((number1 / number2) * 100).toFixed(0)
    const loaded = reactive({state: false});
    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };
    const chartData = reactive({
      labels: [ number1+' Completed', number2+' Not Completed'],
      datasets: [{
        labels: [ 'Completed', 'Not Completed'],
        backgroundColor: ['#41B883', '#DD1B16'],
        data: [number1, number2]
      }]
    });

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { headerName: "Course Name", field: "Name"},
        { headerName: "Total No of User Completed", field: "peopleCompleted" },
        { headerName: "% completed", field: "completedPercent" },
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    };

    // Example load data from sever
    onMounted(() => {
      loaded.state = true;
      let coursesData;
      if (localStorage.getItem('courses') === null) {
        // fetch(`http://localhost:8081/api/getCourses`, {
        fetch(`https://shark-app-pjbx4.ondigitalocean.app/api/getCourses`, {
          method: 'GET'
        })
            .then(resp => resp.json())
            .then((d) => {
              console.log(d);
              localStorage.setItem('courses', JSON.stringify(d))
              rowData.value = d;
              loaded.state = true;
            })
      } else {
        rowData.value = JSON.parse(localStorage.getItem('courses'))
      }

    });

    return {
      onGridReady,
      number3,
      chartData,
      loaded,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked: (event) => { // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
      rowClicked: (data) => {
        console.log(data.data);
        router.push({name: 'courses', params: {id: data.data.Id}})
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