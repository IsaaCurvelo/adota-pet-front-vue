<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-sm-and-up" />

      <v-toolbar-title class="headline">
        <router-link to="/" tag="span" style="cursor: pointer">
          <span>Adota</span>
          <span class="font-weight-light">PET</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menuItems" :key="item.title" text :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          <span class="mr-2">{{item.title}}</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters(["isLogged"]),

    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "LOGAR", link: "/logar" },
        { icon: "mdi-lock-open", title: "CRIAR CONTA", link: "/registrar" }
      ];
      if (this.isLogged) {
        menuItems = [
          { icon: "mdi-account-circle", title: "PERFIL", link: "/perfil" },
          { icon: "mdi-cat", title: "MEUS PETS", link: "/meus-pets" }
        ];
      }
      return menuItems
    }
  }
};
</script>
