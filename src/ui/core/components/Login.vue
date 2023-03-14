<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <b-row class="vh-100" align-v="center" align-h="center">
    <b-col sm="5" cols="12">
      <b-card class="">
        <b-card-text>
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="loginInvalid"
            @dismissed="loginInvalid = false"
          >
            Invalid email or password
          </b-alert>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(authLogin)">
              <validation-provider
                v-slot="validationContext"
                name="Email"
                :rules="{ required: true, email: true }"
              >
                <b-form-group
                  id="input-group-1"
                  label="Email:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    :state="getValidationState(validationContext)"
                    type="email"
                    placeholder="E-mail"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-2-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                v-slot="validationContext"
                name="Password"
                :rules="{ required: true }"
              >
                <b-form-group
                  id="input-group-2"
                  label="Password:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-2-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <b-overlay
                :show="loading.button"
                rounded
                block
                opacity="0.6"
                spinner-small
                spinner-variant="primary"
              >
                <b-button
                  :disabled="loading.button"
                  type="submit"
                  block
                  variant="primary"
                >
                  Login
                </b-button>
              </b-overlay>
            </b-form>
          </validation-observer>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default Vue.extend({
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    showAlert: {
      type: Boolean,
      required: false,
      default: () => false
    },
    loadingButton: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data() {
    return {
      loading: {
        button: this.loadingButton
      },
      form: {
        email: undefined as string | undefined,
        password: undefined as string | undefined
      },
      loginInvalid: this.showAlert
    };
  },
  watch: {
    showAlert(val) {
      this.loginInvalid = val;
    },
    loginInvalid(val) {
      if (val === false) {
        this.$emit('close');
      }
    },
    loadingButton(val) {
      this.loading.button = val;
    }
  },
  methods: {
    getValidationState({
      dirty = undefined,
      validated = undefined,
      valid = null
    }) {
      return dirty || validated ? valid : null;
    },
    authLogin() {
      this.$emit('login', this.form);
    }
  }
});
</script>
