<template>
  <b-container class="vh-100">
    <Login
      :show-alert="showAlert"
      :loading-button="loadingButton"
      @login="getLogin"
      @close="showAlert = false"
    />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      form: {
        email: undefined as string | undefined,
        password: undefined as string | undefined
      },
      loadingButton: false as boolean,
      showAlert: false as boolean
    };
  },
  methods: {
    getLogin(form: { email: string; password: string }) {
      this.loadingButton = true;
      this.$auth
        .loginWith('local', { data: { login: form } })
        .then(() => {
          this.loadingButton = false;
        })
        .catch(() => {
          this.loadingButton = false;
          this.showAlert = true;
        });
    }
  }
});
</script>

<style scoped lang="scss"></style>
