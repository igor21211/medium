<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign Up</h1>
            <p class="text-xs-center">
              <router-link :to="{ name: 'login' }"
                >Have an account?</router-link
              >
            </p>
            <app-validation-errors
              v-if="validationErrors"
              :validation-errors="validationErrors"
            />
            <form @submit.prevent="onSubmit">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    v-model="username"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    v-model="email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  />
                </fieldset>
                <button
                  :disabled="isSubmitting"
                  class="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors';
import { actionTypes } from '@/store/modules/auth';
import { mapState } from 'vuex';
export default {
  name: 'app-register',
  components: {
    AppValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
      username: '',
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
    /*  isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    }, */
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'globalFeed' });
        });
    },
  },
};
</script>

<style></style>
