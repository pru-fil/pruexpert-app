<template>
  <form method="POST" action="">
    <div class="container">
      <ol class="step-indicator">
        <li v-for="step in steps" :class="indicatorClass(step)">
          <div class="step">
            <font-awesome-icon :icon="step.icon_class"></font-awesome-icon>
          </div>
          <div class="caption hidden-xs hidden-sm">Step <span v-text="step.id"></span>: <span
              v-text="step.title"></span></div>
        </li>
      </ol>

      <!--        <div v-show="currentstep == 1">-->
      <!--          <h3>Step 1</h3>-->
      <!--          <div class="form-group">-->
      <!--            <label for="email">Email address</label>-->
      <!--            <input type="email" name="email" class="form-control" aria-describedby="emailHelp"-->
      <!--                   placeholder="Enter email">-->
      <!--            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
      <!--          </div>-->
      <!--          <div class="form-group">-->
      <!--            <label for="password">Password</label>-->
      <!--            <input type="password" name="password" class="form-control" placeholder="Password">-->
      <!--          </div>-->
      <!--        </div>-->

      <!--        <div v-show="currentstep == 2">-->
      <!--          <h3>Step 2</h3>-->
      <!--          <div class="form-group">-->
      <!--            <label for="select">Example select</label>-->
      <!--            <select class="form-control" name="select">-->
      <!--              <option>1</option>-->
      <!--              <option>2</option>-->
      <!--              <option>3</option>-->
      <!--              <option>4</option>-->
      <!--              <option>5</option>-->
      <!--            </select>-->
      <!--          </div>-->
      <!--        </div>-->

      <!--        <div v-show="currentstep == 3">-->
      <!--          <h3>Step 3</h3>-->
      <!--          <div class="form-group">-->
      <!--            <label for="textarea">Example textarea</label>-->
      <!--            <textarea class="form-control" name="textarea" rows="4"></textarea>-->
      <!--          </div>-->
      <!--          <div class="form-group">-->
      <!--            <label for="file">File input</label>-->
      <!--            <input type="file" class="form-control-file" name="file" aria-describedby="fileHelp">-->
      <!--            <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the-->
      <!--              above input. It's a bit lighter and easily wraps to a new line.</small>-->
      <!--          </div>-->
      <!--        </div>-->

      <!--        <step v-for="step in steps" :currentstep="currentstep" :key="step.id" :step="step" :stepcount="steps.length"-->
      <!--              @step-change="stepChanged">-->
      <!--        </step>-->

      <!--        <script type="x-template" id="step-navigation-step-template">-->
      <!--          <li :class="indicatorclass">-->
      <!--            <div class="step"><i :class="step.icon_class"></i></div>-->
      <!--            <div class="caption hidden-xs hidden-sm">Step <span v-text="step.id"></span>: <span-->
      <!--                v-text="step.title"></span></div>-->
      <!--          </li>-->
      <!--        </script>-->

      <!--        <div class="step-wrapper" :class="stepWrapperClass">-->
      <!--          <button type="button" class="btn btn-primary" @click="lastStep" :disabled="firststep">-->
      <!--            Back-->
      <!--          </button>-->
      <!--          <button type="button" class="btn btn-primary" @click="nextStep" :disabled="laststep">-->
      <!--            Next-->
      <!--          </button>-->
      <!--          <button type="submit" class="btn btn-primary" v-if="laststep">-->
      <!--            Submit-->
      <!--          </button>-->
      <!--        </div>-->
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button class="btn btn-primary" @click.prevent="completeModule">Go somewhere</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {reactive, computed, onMounted} from 'vue';
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: "Trigger",

  setup() {
    const router = useRoute();
    const user =  reactive({
      id: null
    })
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
      axios({
        method: 'post',
        url: 'http://localhost:8001/api/getUser',
        data: {
          username: 'fil.sandalo@peoplebank.asia',
        }
      }).then((resp) => {
        user.id = resp.data.Id;
      })
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
      steps,
      stepValue,
      stepCount,
      currentStep,
      indicatorClass,
      completeModule
    }

  }
}
</script>

<style lang="scss" scoped>
//$wizard-color-neutral: #ccc !default;
//$wizard-color-active: #4183D7 !default;
//$wizard-color-complete: #87D37C !default;
//$wizard-step-width-height: 64px !default;
//$wizard-step-font-size: 24px !default;
//
//.step-wrapper {
//  padding: 20px 0;
//  display: none;
//
//  &.active {
//    display: block;
//  }
//}
//
//
//.step-indicator {
//  border-collapse: separate;
//  display: table;
//  margin-left: 0px;
//  position: relative;
//  table-layout: fixed;
//  text-align: center;
//  vertical-align: middle;
//  padding-left: 0;
//  padding-top: 20px;
//
//  li {
//    display: table-cell;
//    position: relative;
//    float: none;
//    padding: 0;
//    width: 1%;
//
//    &:after {
//      background-color: $wizard-color-neutral;
//      content: "";
//      display: block;
//      height: 1px;
//      position: absolute;
//      width: 100%;
//      top: $wizard-step-width-height/2;
//    }
//
//    &:after {
//      left: 50%;
//    }
//
//    &:last-child {
//      &:after {
//        display: none;
//      }
//    }
//
//    &.active {
//      .step {
//        border-color: $wizard-color-active;
//        color: $wizard-color-active;
//      }
//
//      .caption {
//        color: $wizard-color-active;
//      }
//    }
//
//    &.complete {
//      &:after {
//        background-color: $wizard-color-complete;
//      }
//
//      .step {
//        border-color: $wizard-color-complete;
//        color: $wizard-color-complete;
//      }
//
//      .caption {
//        color: $wizard-color-complete;
//      }
//    }
//  }
//
//  .step {
//    background-color: #fff;
//    border-radius: 50%;
//    border: 1px solid $wizard-color-neutral;
//    color: $wizard-color-neutral;
//    font-size: $wizard-step-font-size;
//    height: $wizard-step-width-height;
//    line-height: $wizard-step-width-height;
//    margin: 0 auto;
//    position: relative;
//    width: $wizard-step-width-height;
//    z-index: 1;
//
//    &:hover {
//      cursor: pointer;
//    }
//  }
//
//  .caption {
//    color: $wizard-color-neutral;
//    padding: 11px 16px;
//  }
//}
</style>