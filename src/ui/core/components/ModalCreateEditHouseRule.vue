<template>
  <b-modal ref="modal" v-model="modalShow" :title="labelModal" hide-footer>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form ref="form" @submit.stop.prevent="handleSubmit(save)">
        <validation-provider
          v-slot="validationContext"
          name="Name"
          :rules="{ required: true }"
        >
          <b-form-group label="Name" label-for="name-input">
            <b-form-input
              id="name-input"
              v-model="model.name"
              :state="getValidationState(validationContext)"
            />
            <b-form-invalid-feedback id="input-2-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <b-form-group label="Is Active?">
          <b-form-checkbox
            id="checkbox-1"
            v-model="active"
            name="checkbox-1"
            :value="true"
            :unchecked-value="false"
          >
            {{ active ? 'Yes' : 'No' }}
          </b-form-checkbox>
        </b-form-group>
        <b-button type="submit" block variant="primary"> Save </b-button>
      </form>
    </validation-observer>
  </b-modal>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

interface HouseRule {
  id?: number;
  name?: string;
  active?: number;
}

export default Vue.extend({
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    labelModal: {
      type: String,
      default: () => 'Create House Rule'
    },
    fields: {
      type: Object,
      default: () => {},
      required: false
    } as PropOptions<HouseRule>
  },
  data() {
    return {
      modalShow: this.show,
      model: this.fields,
      active: this.fields.active === 1
    };
  },
  watch: {
    show(value) {
      this.modalShow = value;
    },
    modalShow(value) {
      if (value === false) {
        this.$emit('closed');
        this.model.id = undefined;
        this.model.name = undefined;
        this.model.active = undefined;
      }
    },
    'fields.active'(val) {
      this.active = val === 1;
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
    save() {
      this.model.active = this.active === true ? 1 : 0;
      this.$emit('save', this.model);
      this.modalShow = false;
      this.active = false;
    }
  }
});
</script>
