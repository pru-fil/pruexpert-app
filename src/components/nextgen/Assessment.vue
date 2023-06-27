<template>
  <section class="vh-75">
    <div class="container py-5 h-75">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-12 mx-auto" style="width:100%">
          <div class="card shadow-lg" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-12 col-lg-12 d-flex align-items-center">
                <div class="card-body pt-4 pb-2 text-black">

                  <form v-if="!hideForm" >

                    <p style="font-size: 22px; font-weight: 600;" >{{$t('headerOne')}}</p>
                    <hr />
                    <p style="font-size: 16px;">{{$t('headerTwo')}}</p>
                    <p style="font-size: 16px;">{{$t('headerThree')}}</p>
                    <p style="font-size: 16px;">{{$t('headerFour')}}</p>

                    <div class="form-group mb-4">
                      <textarea type="text" id="form2Example17" rows="5" v-model="comment" :placeholder="$t('placeholder')" class="form-control" required/>
                    </div>
                    <div v-if="hasError" class="alert alert-danger alert-dismissible fade show d-inline-flex">
                      <strong>Error!&nbsp;</strong> {{ errorMsg }}
                    </div>
                    <div class="pt-1 mb-4 text-center">
                      <button class="btn btn-dark btn-lg" style="background-color: #ED1B2E !important; font-weight: 600;" id="trigger-btn-check" @click.prevent="handleSubmit" type="button">
                        <img src="@/assets/images/cursor.png"/> {{ $t('submit')}}
                      </button>
                    </div>

                  </form>

                  <div v-if="hideForm">
                    <div class="alert alert-success alert-dismissible fade show">
                      <strong>Success!&nbsp;</strong> {{$t('success')}} Please click "Next" button above to view comments.
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
import { useI18n } from 'vue-i18n'
import i18n from "../../i18n";


export default {
  name: "Assessment",

  setup() {
    const { t } = useI18n();
    const router = useRoute();
    let hideForm = ref(false);
    let comment = ref('');
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
      if (comment.value.trim() === "") {
        hasError.value = true;
        errorMsg.value = t('empty');
        return;
      }
      axios({
        method: 'post',
        url: 'https://shark-app-pjbx4.ondigitalocean.app/api/completePruexpert',
        // url: 'http://localhost:8001/api/completePruexpert',
        data: {
          username: router.query.username,
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
          errorMsg.value = t("error");
        } else if (data.code == 200) {
          hideForm.value = true;
        } else {
          hasError.value = true;
          errorMsg.value = "Unknown Error Occurred";
        }

        console.log(resp.data);
      }).catch(() => {
        hasError.value = true;
        errorMsg.value = t("error");
      })
    }

    function indicatorClass(step) {
      console.log(step);
      return {
        active: step.id === currentStep,
        complete: currentStep > step.id
      }
    }

    return {
      hideForm,
      hasError,
      errorMsg,
      comment,
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
#form2Example17::-webkit-input-placeholder {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 16px;
}

#form2Example17 {
  background-color: #ECF0F0;
}
</style>