<template>
  <section class="vh-75">
    <div class="container py-5 h-75">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-12 mx-auto" style="width:500px">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-12 col-lg-12 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form v-if="!hideForm" >

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Input Username</h5>

                    <div class="form-group mb-4">
                      <label for="form2Example17">Username</label>
                      <input type="text" id="form2Example17" v-model="username" placeholder="Enter username" class="form-control" />

                    </div>

<!--                    <div class="form-outline mb-4">-->
<!--                      <input type="password" id="form2Example27" v-model="password" class="form-control form-control-lg" />-->
<!--                      <label class="form-label" for="form2Example27">Password</label>-->
<!--                    </div>-->

                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" @click.prevent="handleSubmit" type="button">Check</button>
                    </div>

                  </form>

                  <div v-if="hideForm">
                    Account has a valid license, modules unlocked.
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


<!--      <div class="card" style="width: 18rem;">-->
<!--        <img class="card-img-top" src="#" alt="Card image cap">-->
<!--        <div class="card-body">-->
<!--          <h5 class="card-title">Card title</h5>-->
<!--          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
<!--          <button class="btn btn-primary" @click.prevent="completeModule">Go somewhere</button>-->
<!--        </div>-->
<!--      </div>-->

</template>

<script>
import {reactive, computed, onMounted, ref} from 'vue';
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: "Trigger",

  setup() {
    const router = useRoute();
    const user =  reactive({
      id: null
    })
    let hideForm = ref(false);
    let username = ref('');
    let password = ref('');
    const stepCount = 0;
    const currentStep = 1;
    const stepValue = {
      id: 1
    };
    const steps = [
      {
        id: 1,
        title: "Personal",
        icon_class: "fa fa-user-circle-o"
      },
      {
        id: 2,
        title: "Details",
        icon_class: "fa fa-th-list"
      },
      {
        id: 3,
        title: "Send",
        icon_class: "fa fa-paper-plane"
      }
    ];

    const handleSubmit = () => {
      // hideForm.value = true;
      console.log(password, username);
      axios({
        method: 'post',
        url: 'http://localhost:8001/api/completeModule',
        data: {
          username: username.value,
          password: password.value,
          title: router.query.title,
          moduleId: router.query.moduleId
        }
      }).then((resp) => {
        console.log(resp);
      })
    }

    function indicatorClass(step) {
      console.log(step);
      return {
        active: step.id === currentStep,
        complete: currentStep > step.id
      }
    }

    function completeModule() {
      if (router.query.title) {
        axios({
          method: 'post',
          url: 'http://localhost:8001/api/completeModule',
          data: {
            id: user.id,
            title: router.query.title,
            moduleId: router.query.moduleId
          }
        }).then((resp) => {
          console.log(resp);
        })
      } else {
        console.log("wala")
      }

    }

    const lastStep = () => {

    }

    onMounted(() => {

      let userId;
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8001/api/getUser',
      //   data: {
      //     username: 'fil.sandalo@peoplebank.asia',
      //   }
      // }).then((resp) => {
      //   user.id = resp.data.Id;
      // })
      // let coursesData;
      // if (localStorage.getItem('courses') === null) {
      //   fetch(`http://localhost:8000/api/getCourses`, {
      //     method: 'GET'
      //   })
      //       .then(resp => resp.json())
      //       .then((d) => {
      //         console.log(d);
      //         localStorage.setItem('courses', JSON.stringify(d))
      //         rowData.value = d;
      //       })
      // } else {
      //   rowData.value = JSON.parse(localStorage.getItem('courses'))
      // }

    });


    return {
      hideForm,
      username,
      password,
      steps,
      stepValue,
      stepCount,
      currentStep,
      indicatorClass,
      completeModule,
      handleSubmit
    }

  }
}
</script>

<style lang="scss" scoped>
#content{
  margin-left: 0 !important;
}
</style>