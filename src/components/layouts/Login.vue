<template>
<!--  <section class="h-100 gradient-form" style="background-color: #eee;">-->
<!--    <div class="container py-5 h-100">-->
<!--      <div class="row d-flex justify-content-center align-items-center h-100">-->
<!--        <div class="col-xl-10">-->
<!--          <div class="card rounded-3 text-black">-->
<!--            <div class="row g-0">-->
<!--              <div class="col-lg-6">-->
<!--                <div class="card-body p-md-5 mx-md-4">-->

<!--                  <div class="text-center">-->
<!--                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"-->
<!--                         style="width: 185px;" alt="logo">-->
<!--                    <h4 class="mt-1 mb-5 pb-1">PruExpert Litmos Team</h4>-->
<!--                  </div>-->

<!--                  <form>-->
<!--                    <p>Please login to your account</p>-->

<!--                    <div class="form-outline mb-4">-->
<!--                      <input type="email" id="form2Example11" class="form-control"-->
<!--                             placeholder="email address" />-->
<!--                      <label class="form-label" for="form2Example11">Username</label>-->
<!--                    </div>-->

<!--                    <div class="form-outline mb-4">-->
<!--                      <input type="password" id="form2Example22" class="form-control" />-->
<!--                      <label class="form-label" for="form2Example22">Password</label>-->
<!--                    </div>-->

<!--                    <div class="text-center pt-1 mb-5 pb-1">-->
<!--                      <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log-->
<!--                        in</button>-->
<!--                      <a class="text-muted" href="#!">Forgot password? Please Contact your immediate head</a>-->
<!--                    </div>-->

<!--                    <div class="d-flex align-items-center justify-content-center pb-4">-->
<!--                      <p class="mb-0 me-2"></p>-->
<!--                    </div>-->

<!--                  </form>-->

<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">-->
<!--                <div class="text-white px-3 py-4 p-md-5 mx-md-4">-->
<!--                  <h4 class="mb-4">We are more than just a company</h4>-->
<!--                  <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod-->
<!--                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud-->
<!--                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                     alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form>

                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                      <span class="h1 fw-bold mb-0">Logo</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                    <div class="form-outline mb-4">
                      <input type="email" id="form2Example17" class="form-control form-control-lg" />
                      <label class="form-label" for="form2Example17">Email address</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" id="form2Example27" class="form-control form-control-lg" />
                      <label class="form-label" for="form2Example27">Password</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" @click="handleSubmit" type="button">Login</button>
                    </div>

                    <a class="small text-muted" href="#!">Forgot password?</a>
                    <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <a href="#!"
                                                                                              style="color: #393f81;">Register here</a></p>
                    <a href="#!" class="small text-muted">Terms of use.</a>
                    <a href="#!" class="small text-muted">Privacy policy</a>
                  </form>

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
import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn} from "mdb-vue-ui-kit";

export default {
  name: "Login",
  components: {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  },
  props: {
    msg: String
  },
  methods: {
    handleSubmit() {
      console.log("Here");
      this.$router.push({path: '/home'})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gradient-custom-2 {
  /* fallback for old browsers */
  background: #fccb90;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}
@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
}

</style>
