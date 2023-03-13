<template>
  <b-container>
    <div>
      <b-button squared class="mb-2 border-0" style="background-color: #2ba9c2">
        ADICIONAR
        <b-icon class="ml-1" icon="plus"> </b-icon>
      </b-button>
      <base-table
        :fields="fields"
        :items="items"
        :loading="loading.table"
        @delete="getIdByDelete"
      />
    </div>
    <modal-confirm-delete
      :show="modalConfirmDelete"
      @closed="closedModalConfirmDelete"
      @confirm="deleteHouseRulesById"
    />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { deleteHouseRuleUseCase } from '~/app/modules/house-rules/use-cases/DeleteHouseRule';
import { houseRuleUseCase } from '~/app/modules/house-rules/use-cases/GetAllHouseRules';
import { GetAllHouseRulesDTO } from '~/app/modules/house-rules/use-cases/GetAllHouseRules/GetAllHouseRulesDTO';
import { Helper } from '~/shared/helper/Helper';
import BaseTable from '~/ui/core/components/BaseTable.vue';
import ModalConfirmDelete from '~/ui/core/components/ModalConfirmDelete.vue';
export default Vue.extend({
  components: { BaseTable, ModalConfirmDelete },
  layout: 'layoutHome',
  middleware: 'auth',
  data() {
    return {
      loading: {
        table: false as boolean
      },
      info: {
        token: undefined as string | undefined
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        },
        {
          key: 'name',
          label: 'name',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        },
        {
          key: 'active',
          label: 'active',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        },
        {
          key: 'order',
          label: 'order',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        },
        {
          key: 'edit',
          label: 'Edit',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        },
        {
          key: 'delete',
          label: 'Delete',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        }
      ],
      items: [] as GetAllHouseRulesDTO.ResponseProps[] | [],
      modalConfirmDelete: false as boolean,
      idDelete: undefined as number | undefined
    };
  },
  created() {
    this.info.token = this.$auth.$storage.getUniversal(
      '_token.local'
    ) as string;
    this.getAllHouseRules();
  },
  methods: {
    async getAllHouseRules() {
      if (Helper.isDefined(this.info.token)) {
        const req = {
          token: this.info.token
        };
        this.loading.table = true;
        const res = await houseRuleUseCase.execute(req);
        this.loading.table = false;
        if (res.isLeft()) {
          return alert('error');
        }
        this.items = res.value.getValue().entities;
      }
    },
    showModalConfirmDelete() {
      this.modalConfirmDelete = true;
    },
    closedModalConfirmDelete() {
      this.idDelete = undefined;
      this.modalConfirmDelete = false;
    },
    getIdByDelete(id: number) {
      this.idDelete = id;
      this.showModalConfirmDelete();
    },
    async deleteHouseRulesById() {
      if (
        Helper.isDefined(this.info.token) &&
        Helper.isDefined(this.idDelete)
      ) {
        const req = {
          token: this.info.token,
          input: {
            id: this.idDelete
          }
        };

        const res = await deleteHouseRuleUseCase.execute(req);
        this.idDelete = undefined;
        if (res.isLeft()) {
          return alert('Error');
        }
        this.getAllHouseRules();
      }
    }
  }
});
</script>

<style lang="scss"></style>
