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
                    <div class="row">
                      <div class="col-md-12">
                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Digital Trigger</h5>
                        <label for="form2Example17">Level of understanding</label>
                        <div class="form-group mb-4">
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                              Fully Understood
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                              Understood
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                              Did not Understood some things
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                            <label class="form-check-label" for="flexRadioDefault2">
                              Didn't understood everything
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-6">
                        Please Select Topics you are interested in
                        <Multiselect :options="options" mode="tags"></Multiselect>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">

                        <div class="form-group mb-4">
                          <label for="learnings-textarea">Please Input Learnings Here</label>
                          <textarea type="text" id="learnings-textarea" v-model="learnings" placeholder="Learnings" class="form-control" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <div class="pt-1 mb-4">
                          <button class="btn btn-dark btn-lg" id="trigger-btn-check" @click.prevent="handleSubmit" type="button">Submit</button>
                        </div>
                      </div>
                    </div>

                    <div v-if="hasError" class="alert alert-danger alert-dismissible fade show">
                      <strong>Error!</strong> {{ errorMsg }}
                    </div>


                  </form>

                  <div v-if="hideForm">
                    <div class="alert alert-success alert-dismissible fade show">
                      <strong>Success!</strong> Module Completed!
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
import Multiselect from '@vueform/multiselect'

export default {
  name: "DigitalTrigger",
  components: {
    Multiselect
  },

  setup() {
    const options = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5']
    const router = useRoute();
    const user =  reactive({
      id: null
    })
    let hideForm = ref(false);
    let learnings = ref('');
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
      if (learnings.value == '') {
        hasError.value = true;
        errorMsg.value = "Please input Learnings";
        return;
      }
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

    });


    return {
      hideForm,
      hasError,
      errorMsg,
      learnings,
      password,
      steps,
      stepValue,
      stepCount,
      currentStep,
      indicatorClass,
      handleSubmit,
      options
    }

  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
#content{
  margin-left: 0 !important;
}
</style>