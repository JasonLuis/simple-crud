<template>
  <b-modal v-model="modalShow" hide-footer>
    <template #modal-title> Confirm delete item? </template>

    <b-button size="md" variant="primary" @click="confirmDelete()">
      Yes
    </b-button>
    <b-button size="md" variant="danger" @click="modalShow = false">
      No
    </b-button>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      modalShow: this.show
    };
  },
  watch: {
    show(value) {
      this.modalShow = value;
    },
    modalShow(value) {
      if (value === false) {
        this.$emit('closed');
      }
    }
  },
  methods: {
    confirmDelete(option: boolean) {
      this.modalShow = false;
      this.$emit('confirm', option);
    }
  }
});
</script>
