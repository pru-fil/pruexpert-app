<template>
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
  },
  setup() {
    const router = useRouter()
    const gridApi = ref(null); // Optional - for accessing Grid's API

    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { headerName: "Course Name", field: "Name"},
        { headerName: "Total No of User Assigned", field: "userCount" },
        { headerName: "Total No of User Completed", field: "completedCount" },
        { headerName: "% Completed", field: "percentageComplete" }
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
      const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: authHeader()
      };

      let courses;
      fetch(`https://api.litmos.com.au/v1.svc/courses?source=map&format=json&start=1&limit=1000`, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {
          apikey: 'c27692cc-02df-4dc4-ae8c-3a52e25bc860'
        }
      })
      .then(resp => resp.json())
      .then((d) => {
        courses = d;
      })

      console.log(courses);
      coursesData.forEach(course => {
        console.log(course)
        fetch(`http://127.0.0.1:8000/public/dummy/course_user_${course.Id}.json`)
            .then((resp) => resp.json())
            .then((d) => {
              let completedCount = 0;
              d.forEach(user => {
                if(user.Completed) {
                  completedCount++;
                }
              })
              course.userCount =  Object.keys(d).length
              course.completedCount = completedCount;
              course.percentageComplete = (completedCount / course.userCount) * 100;
            });
      })

      console.log(coursesData);
      rowData.value = coursesData;
    });

    return {
      onGridReady,
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