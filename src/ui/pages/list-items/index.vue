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
    console.log(this.info.token);
  }
});
</script>

<style scoped lang="scss"></style>
