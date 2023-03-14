<template>
  <b-container>
    <div>
      <b-button
        squared
        class="mb-2 border-0"
        style="background-color: #2ba9c2"
        @click="modalCreateOrUpdate = true"
      >
        ADICIONAR
        <b-icon class="ml-1" icon="plus"> </b-icon>
      </b-button>
      <base-table
        :fields="fields"
        :items="items"
        :loading="loading.table"
        @delete="getIdByDelete"
        @edit="getHouseRuleById"
      />
    </div>
    <modal-confirm-delete
      :show="modalConfirmDelete"
      @closed="modalConfirmDelete = false"
      @confirm="deleteHouseRulesById"
    />
    <modal-create-edit-house-rule
      :show="modalCreateOrUpdate"
      :fields="modelCreateUpdate"
      @closed="modalCreateOrUpdate = false"
      @save="createUpdateHouseRule"
    />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { createHouseRuleUseCase } from '~/app/modules/house-rules/use-cases/CreateHouseRule';
import { deleteHouseRuleUseCase } from '~/app/modules/house-rules/use-cases/DeleteHouseRule';
import { houseRuleUseCase } from '~/app/modules/house-rules/use-cases/GetAllHouseRules';
import { GetAllHouseRulesDTO } from '~/app/modules/house-rules/use-cases/GetAllHouseRules/GetAllHouseRulesDTO';
import { getHouseRulesByIdUseCase } from '~/app/modules/house-rules/use-cases/GetHouseRulesById';
import { updateHouseRuleUseCase } from '~/app/modules/house-rules/use-cases/UpdateHouseRule';
import { Helper } from '~/shared/helper/Helper';
import BaseTable from '~/ui/core/components/BaseTable.vue';
import ModalConfirmDelete from '~/ui/core/components/ModalConfirmDelete.vue';
import ModalCreateEditHouseRule from '~/ui/core/components/ModalCreateEditHouseRule.vue';

interface HouseRule {
  id?: number;
  name: string;
  active: number;
}

export default Vue.extend({
  components: { BaseTable, ModalConfirmDelete, ModalCreateEditHouseRule },
  layout: 'layoutHome',
  middleware: 'auth',
  data() {
    return {
      loading: {
        table: false as boolean,
        modalCreateUpdte: false as boolean
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
          label: 'Name',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        },
        {
          key: 'active',
          label: 'Active',
          thClass: 'text-center',
          tdClass: ['text-center', 'align-middle']
        },
        {
          key: 'order',
          label: 'Order',
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
      modalCreateOrUpdate: false as boolean,
      idDelete: undefined as number | undefined,
      modelCreateUpdate: {
        id: undefined as number | undefined,
        name: undefined as string | undefined,
        active: undefined as number | undefined
      } as HouseRule
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
          return alert(res.value.errorValue().message);
        }
        this.items = res.value.getValue().entities;
      }
    },
    showModalConfirmDelete() {
      this.modalConfirmDelete = true;
    },
    getIdByDelete(id: number) {
      this.idDelete = id;
      this.showModalConfirmDelete();
    },
    async getHouseRuleById(id: number) {
      if (Helper.isDefined(id) && Helper.isDefined(this.info.token)) {
        const req = {
          token: this.info.token,
          input: {
            id
          }
        };

        const res = await getHouseRulesByIdUseCase.execute(req);

        if (res.isLeft()) {
          return alert(res.value.errorValue().message);
        }
        const houseRule = res.value.getValue();
        this.modelCreateUpdate.id = houseRule.id;
        this.modelCreateUpdate.name = houseRule.name;
        this.modelCreateUpdate.active = houseRule.active;
        this.modalCreateOrUpdate = true;
      }
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
          return alert(res.value.errorValue().message);
        }
        this.getAllHouseRules();
      }
    },
    async createUpdateHouseRule() {
      if (Helper.isDefined(this.info.token)) {
        if (Helper.isDefined(this.modelCreateUpdate.id)) {
          const req = {
            token: this.info.token,
            input: {
              house_rules: {
                id: this.modelCreateUpdate.id,
                name: this.modelCreateUpdate.name,
                active: Number(this.modelCreateUpdate.active)
              }
            }
          };

          const res = await updateHouseRuleUseCase.execute(req);

          if (res.isLeft()) {
            return alert(res.value.errorValue().message);
          }
          this.getAllHouseRules();
          return;
        }
        const req = {
          token: this.info.token,
          input: {
            house_rules: {
              name: this.modelCreateUpdate.name,
              active: Number(this.modelCreateUpdate.active)
            }
          }
        };
        const res = await createHouseRuleUseCase.execute(req);

        if (res.isLeft()) {
          return alert(res.value.errorValue().message);
        }

        this.getAllHouseRules();
      }
    }
  }
});
</script>

<style lang="scss"></style>
