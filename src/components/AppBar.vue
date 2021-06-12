<template>
  <v-app-bar fixed app>
    <router-link to="/"
      ><v-img max-width="70" src="../assets/img/herolo.png" alt="herolo"></v-img
    ></router-link>
    <v-toolbar-title class="hidden-sm-and-down ml-4"
      >Weather App</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <router-link class="hidden-sm-and-down ml-4" to="/"> Home</router-link>

    <router-link class="hidden-sm-and-down ml-4 ml-6" to="/favorites"
      >Favorites</router-link
    >
    <v-btn class="toggle-button toggle-unit-button ml-7" @click="changeUnit">
      {{ unit }}
    </v-btn>
    <v-switch class="mt-5 ml-7" v-model="$vuetify.theme.dark"></v-switch>
    <v-menu v-if="$vuetify.breakpoint.mobile" class="hidden-md-and-up">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-app-bar-nav-icon> </v-app-bar-nav-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item to="/favorites">
          <v-list-item-title>Favorites</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from "../utils/vue-imports";
import { State, Action } from "vuex-class";

@Component({ name: "AppBar" })
export default class AppBar extends Vue {
  @State readonly unit!: string;
  @Action public changeUnit!: () => void;

  changeTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>
<style lang="scss">
.header.is_mobile {
  .v-toolbar__content {
    flex-direction: column;
  }
}
</style>
