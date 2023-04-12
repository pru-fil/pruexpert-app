<template>
  <section class="vh-75">
    <div class="container py-5 h-75">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-12 mx-auto" style="width:100%">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-12 col-lg-12 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form v-if="!hideForm" >

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">{{ inputMessage }}</h5>

<!--                    <div class="form-group mb-4">-->
<!--                      <label for="form2Example17">Username</label>-->
<!--                      <input type="text" id="form2Example17" v-model="username" placeholder="Enter username" class="form-control" />-->
<!--                    </div>-->
                    <div v-if="hasError" class="alert alert-danger alert-dismissible fade show d-inline-flex">
                      <strong>Access Denied!&nbsp;</strong> <div v-html="errorMsg"></div>
                    </div>
                    <div class="pt-1 mb-4 text-center">
                      <button class="btn btn-dark btn-lg" id="trigger-btn-check" @click.prevent="handleSubmit" type="button">Submit</button>
                    </div>

                  </form>

                  <div v-if="hideForm">
                    <div class="alert alert-success alert-dismissible fade show">
                      <strong>Access Granted! </strong> Your license has been successfully verified. Please click "Next" button above to start the e-learning.
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
    let inputMessage = ref('');
    let username = ref('');
    let password = ref('');
    const hasError = ref(false);
    const errorMsg = ref('');
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
      // if (username.value == '') {
      //   hasError.value = true;
      //   errorMsg.value = "Please input username";
      //   return;
      // }
      axios({
        method: 'post',
        // url: 'https://shark-app-pjbx4.ondigitalocean.app/api/completeModule',
        url: 'http://localhost:8001/api/completeModule',
        data: {
          username: router.query.username,
          password: password.value,
          title: router.query.title,
          moduleId: router.query.moduleId,
          type: router.query.type,
        }
      }).then((resp) => {
        let data = resp.data;
        console.log(data.code);
        if (data.code == 500 || data.code == 404) {
          hasError.value = true;
          errorMsg.value = data.msg;
        } else if (data.code == 200) {
          hideForm.value = true;
        } else {
          hasError.value = true;
          errorMsg.value = "Unknown Error Occurred";
        }

        console.log(resp.data);
      })
    }

    function indicatorClass(step) {
      console.log(step);
      return {
        active: step.id === currentStep,
        complete: currentStep > step.id
      }
    }

    onMounted(() => {
      inputMessage.value = 'To access this e-learning course, please ensure that you have a valid '+ router.query.type
          +' license. Click the "Submit" button below to allow the system to verify your license.';

    });


    return {
      inputMessage,
      hideForm,
      hasError,
      errorMsg,
      username,
      password,
      steps,
      stepValue,
      stepCount,
      currentStep,
      indicatorClass,
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