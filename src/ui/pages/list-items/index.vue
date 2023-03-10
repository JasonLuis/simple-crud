<template>
  <div>teste</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  middleware: 'auth',
  data() {
    return {
      info: {
        token: undefined as string | undefined
      }
    };
  },
  created() {
    this.info.token = this.$auth.$storage.getUniversal(
      '_token.local'
    ) as string;
  }
});
</script>

<style scoped lang="scss"></style>
