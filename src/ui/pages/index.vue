<template>
  <b-container class="vh-100">
    <Login @getLogin="runPage" />
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
      }
    };
  },
  methods: {
    runPage(token: string) {
      this.$router.push({
        path: `list-items`,
        query: { token }
      });
    }
  }
});
</script>

<style scoped lang="scss"></style>
