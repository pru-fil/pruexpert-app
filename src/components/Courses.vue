<template>
  <div>
    <button @click="$router.back()">
      Back
    </button>
  </div>
  <section>
    <div class="container py-5">s
      <div class="row">
        <div class="col">

        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Course Name</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0 fs-5 fw-bold">{{ course.data.Name }}</p>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Description</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ course.data.Description }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <hr>
              <div class="row">
                <div class="col-sm-4">
                  <p class="mb-0">Assigned People</p>
                </div>
                <div class="col-sm-8">
                  <p class="text-muted mb-0">{{ course.data.assignedPeople }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-4">
                  <p class="mb-0">People Completed</p>
                </div>
                <div class="col-sm-8">
                  <p class="text-muted mb-0">{{ course.data.peopleCompleted }}</p>
                </div>
              </div>
              <hr>
            </div>
            <div class="col-sm-8">
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Completed Percent</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ course.data.completedPercent }}</p>
                </div>
              </div><hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Average Time Completed</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ course.data.averageTime }}</p>
                </div>
              </div>
              <hr>
            </div>
          </div>

        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="card mb-4">
            <ag-grid-vue
                class="ag-theme-alpine"
                style="height: 500px"
                :columnDefs="columnDefs.value"
                :rowData="rowData.value"
                :defaultColDef="defaultColDef"
                rowSelection="multiple"
                animateRows="true"
                @row-clicked="rowClicked"
                @cell-clicked="cellWasClicked"
                @grid-ready="onGridReady"
            > </ag-grid-vue>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { useRoute } from 'vue-router'
import {onMounted, reactive, ref, watch} from 'vue'
import usersData from "../assets/dummy/users.json"


import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import router from "../router"; // Optional theme CSS

export default {
  name: "Courses",
  components: {
    AgGridVue,
  },
  setup() {
    const route = useRoute();
    const user = reactive( {
      data: {
        FirstName: null,
        LastName: null,
        AccessLevel: null,
        Active: null,
        Email: null,
      }
    });
    const course = reactive( {
      data: {
        Name: null,
        Description: null,
        assignedPeople: null,
        peopleCompleted: null,
        completedPercent: null,
        averageTime: null,
      }
    });
    const gridApi = ref(null); // Optional - for accessing Grid's API

    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { headerName: "First Name", field: "FirstName"},
        { headerName: "Last Name", field: "LastName"},
        { headerName: "completed", field: "Completed" },
        { headerName: "percentage complete", field: "PercentageComplete" },
        { headerName: "Duration", field: "duration" }
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    };

    onMounted(() => {
      // console.log(route.params.id);
      let courses = JSON.parse(localStorage.getItem('courses'));
      courses.forEach(c => {
        if (c.Id == route.params.id) {
          course.data = c;
        }
      })
      // fetch(`http://localhost:8001/api/getCourseDetails/`+route.params.id, {
      fetch(`https://shark-app-pjbx4.ondigitalocean.app/api/getCourseDetails/`+route.params.id, {
        method: 'GET'
      })
          .then(resp => resp.json())
          .then((d) => {
            console.log(d);
            course.data.averageTime = d.averageTime;
            course.data.assignedPeople = d.assignedPeople;
            rowData.value = d.users;
          })


      // user.data = usersData.find((obj) => {
      //   return obj.Id === route.params.id
      // })
      // console.log(user.data.FirstName);
      // fetch(`http://127.0.0.1:8000/public/dummy/${route.params.id}.json`)
      //     .then((resp) => resp.json())
      //     .then((d) => rowData.value = d);
    });
    return {
      user,
      onGridReady,
      course,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked: (event) => { // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
      rowClicked: (data) => {
        console.log(data.data);
        // router.push({name: 'courses', params: {id: data.data.Id}})
      },
      deselectRows: () =>{
        gridApi.value.deselectAll()
      }
    };
  }
}
</script>

<style scoped>
#app {
  height: inherit !important;
}
</style>