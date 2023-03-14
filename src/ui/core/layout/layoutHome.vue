<template>
  <b-container fluid class="vh-100 p-0 bg-light">
    <div class="bg-light h-100">
      <b-col class="h-100">
        <b-row>
          <b-col cols="12" class="pl-0 pr-0">
            <b-navbar toggleable="lg" type="dark" variant="info">
              <b-navbar-brand href="#">Simple Crud</b-navbar-brand>

              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                  <b-nav-item-dropdown right>
                    <template #button-content>
                      <em>User</em>
                    </template>

                    <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                  </b-nav-item-dropdown>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
          </b-col>
        </b-row>
        <b-row align-h="center" align-v="stretch">
          <b-col cols="8">
            <b-card
              class="bg-white border-1"
              header="CRUD"
              header-tag="header"
              style="border-radius: 5px; margin-top: 10vh"
            >
              <nuxt-child />
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
});
</script>
