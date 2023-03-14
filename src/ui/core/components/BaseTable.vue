<template>
  <div class="overflow-auto">
    <b-table
      id="my-table"
      outlined
      striped
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="5"
      :busy="loadingTable"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(active)="{ item }">
        {{ item.active === 1 ? 'Yes' : 'No' }}
      </template>
      <template #cell(edit)="{ item }">
        <b-button size="sm" variant="primary" @click="editItem(item.id)">
          <b-icon icon="pencil-square" aria-label="Help"></b-icon>
        </b-button>
      </template>
      <template #cell(delete)="{ item }">
        <b-button size="sm" variant="danger" @click="deleteItem(item.id)">
          <b-icon icon="trash" aria-label="Help"></b-icon>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="5"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    fields: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      currentPage: 1 as number
    };
  },
  computed: {
    totalRows(): number {
      return this.items.length;
    },
    loadingTable(): boolean {
      return this.loading;
    }
  },
  methods: {
    editItem(id: number) {
      return this.$emit('edit', id);
    },
    deleteItem(id: number) {
      return this.$emit('delete', id);
    }
  }
});
</script>
