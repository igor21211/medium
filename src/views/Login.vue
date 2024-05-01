<template>
  <div>
    <div class="login-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign In</h1>
            <p class="text-xs-center">
              <router-link :to="{ name: 'register' }"
                >Need an account?</router-link
              >
            </p>
            <app-validation-errors
              v-if="validationErrors"
              :validation-errors="validationErrors"
            />
            <form @submit.prevent="submitForm">
              <fieldset>
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
                  Sign in
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
import { actionTypes } from '@/store/modules/auth';
import AppValidationErrors from '@/components/ValidationErrors';
import { mapState } from 'vuex';
export default {
  name: 'app-login',
  components: {
    AppValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
    /* isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    }, */
  },
  methods: {
    async submitForm() {
      const user = {
        email: this.email,
        password: this.password,
      };
      await this.$store.dispatch(actionTypes.login, user).then(() => {
        this.$router.push({ name: 'globalFeed' });
      });
    },
  },
};
</script>

<style></style>
