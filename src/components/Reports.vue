<template>
  <div>
    <div class="position-absolute top-0 end-0 align-items-center">
      Last Synced:
      {{lastSynced}}
      <button class="btn btn-warning" @click="resync"> Sync</button>
    </div>
    <button @click="$router.back()">
      Back
    </button>
  <div class="container">
    <div class="row align-items-center mb-3">
      <div class="col-9">
        <div class="row">
          <div class="row">
            <div class="col-12">
              Learning Path:
              <p class="text-center fw-bold fs-3">
                {{ learningPath.name }}
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
                {{learningPath.ap}}
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
                {{learningPath.pcp}} %
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
    <div class="pb-5">
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
    </div>
    </div>

</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router'
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import {store} from "../store/store.js";

ChartJS.register(ArcElement, Tooltip, Legend)
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
    const gridApi = ref(null); // Optional - for accessing Grid's API
    const lastSynced = ref(null);

    const learningPath = reactive({
      id: '',
      name: '',
      cp: 0,
      ap: 0,
      pcp: 0,
    });

    const loaded = reactive({state: false});
    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };
    const chartData = reactive({});

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { headerName: "Course Name", field: "Name"},
        { headerName: "User Completed", field: "peopleCompleted", maxWidth: 200  },
        { headerName: "% completed", field: "completedPercent",maxWidth: 160  },
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1
    };

    const resync = () => {
      localStorage.removeItem(route.params.id);
      mounted();
    }

    const computeLogistics = () => {

    }

    const mounted = () => {
      console.log(store.lbu)
      learningPath.name = route.params.name;
      learningPath.id = route.params.id;
      learningPath.ap = parseInt(route.params.ap);
      learningPath.cp = parseInt(route.params.cp);
      if (learningPath.ap != 0) {
        learningPath.pcp = ((route.params.cp / route.params.ap) * 100).toFixed(0);
      } else {
        learningPath.pcp = 0;
      }

      console.log(learningPath.pcp)
      chartData.labels = [ learningPath.cp+' Completed', (learningPath.ap - learningPath.cp)+' Not Completed']
      chartData.datasets = [{
        labels: [ 'Completed', 'Not Completed'],
        backgroundColor: ['#41B883', '#DD1B16'],
        data: [learningPath.cp, (learningPath.ap - learningPath.cp)]
      }];
      loaded.state = true;
      let coursesData;
      if (localStorage.getItem(learningPath.id) === null) {
        // fetch(`http://localhost:8001/api/getCourses/`+learningPath.id + '?' + new URLSearchParams({
        //   lbu: store.lbu
        // }), {
          fetch(`https://shark-app-pjbx4.ondigitalocean.app/api/getCourses/`+learningPath.id + '?' + new URLSearchParams({
           lbu: store.lbu
          }), {
          method: 'GET'
        })
            .then(resp => resp.json())
            .then((d) => {
              localStorage.setItem(learningPath.id, JSON.stringify(d))
              rowData.value = d;
              loaded.state = true;

              let sync =  JSON.parse(localStorage.getItem('sync'));

              if (sync === null) {
                let sync = {
                  [learningPath.id]:new Date().toLocaleString('en-SG')
                }
                lastSynced.value = sync[learningPath.id];
                localStorage.setItem('sync', JSON.stringify(sync))
              } else {
                sync[learningPath.id] = new Date().toLocaleString('en-SG');
                lastSynced.value = sync[learningPath.id];
                localStorage.setItem('sync', JSON.stringify(sync))
              }


            })
      } else {
        rowData.value = JSON.parse(localStorage.getItem(learningPath.id))
        let sync =  JSON.parse(localStorage.getItem('sync'));
        lastSynced.value = sync[learningPath.id];
      }

    }
    // Example load data from sever
    onMounted(() => {
      mounted();
    });

    return {
      onGridReady,
      resync,
      learningPath,
      chartData,
      lastSynced,
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