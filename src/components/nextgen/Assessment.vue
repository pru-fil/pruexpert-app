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

                    <h5 class="fw-normal" style="letter-spacing: 1px;"><div v-html="inputMessage"></div></h5>

                    <div class="form-group mb-4">
                      <textarea type="text" id="form2Example17" rows="5" v-model="comment" placeholder="Enter Comment Here" class="form-control" />
                    </div>
                    <div v-if="hasError" class="alert alert-danger alert-dismissible fade show d-inline-flex">
                      <div v-html="errorMsg"></div>
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
  name: "Assessment",

  setup() {
    const router = useRoute();
    const user =  reactive({
      id: null
    })
    let hideForm = ref(false);
    let inputMessage = ref('');
    let comment = ref('');
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
        url: 'https://shark-app-pjbx4.ondigitalocean.app/api/completePruexpert',
        // url: 'http://localhost:8001/api/completePruexpert',
        data: {
          username: router.query.username,
          password: password.value,
          title: router.query.title,
          moduleId: router.query.moduleId,
          type: router.query.type,
          comment: comment.value
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
      }).catch(() => void 0)
    }

    function indicatorClass(step) {
      console.log(step);
      return {
        active: step.id === currentStep,
        complete: currentStep > step.id
      }
    }

    onMounted(() => {
      inputMessage.value = '<h2>Hi ' +router.query.username+ '. Did the tips in the video above work for you?.</h2> <br>' +
          'Share your tips and experience on effective client presentations in the text box below and click on the submit button';

    });


    return {
      inputMessage,
      hideForm,
      hasError,
      errorMsg,
      comment,
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