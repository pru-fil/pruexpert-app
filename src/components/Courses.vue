<template>
  <section>
    <div class="container py-5">
      <div class="row">
        <div class="col">

        </div>
      </div>

      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                   class="rounded-circle img-fluid" style="width: 150px;">
              <h5 class="my-3">{{ user.data.FirstName }} {{ user.data.LastName }}</h5>
              <p class="text-muted mb-1">{{ user.data.AccessLevel }}</p>
<!--              <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>-->
              <div class="d-flex justify-content-center mb-2">
                <button type="button" class="btn btn-primary">Follow</button>
                <button type="button" class="btn btn-outline-primary ms-1">Message</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">First Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.data.FirstName }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Last Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.data.LastName }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.data.Email }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Access Level</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.data.AccessLevel }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Active</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user.data.Active }}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Lorem Ipsum</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Lorem Ipsum</p>
                </div>
              </div>
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
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

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
    const gridApi = ref(null); // Optional - for accessing Grid's API

    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { headerName: "course name", field: "Name"},
        { headerName: "completed", field: "Complete" },
        { headerName: "percentage complete", field: "PercentageComplete" },
        { headerName: "active", field: "Active" }
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
      user.data = usersData.find((obj) => {
        return obj.Id === route.params.id
      })
      console.log(user.data.FirstName);
      fetch(`http://127.0.0.1:8000/public/dummy/${route.params.id}.json`)
          .then((resp) => resp.json())
          .then((d) => rowData.value = d);
    });
    return {
      user,
      onGridReady,
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