<template>
  <v-container fluid>
    <h2>Meus Pets</h2>
    <v-btn large color="success">
      <v-icon>mdi-plus</v-icon>cadastrar novo
    </v-btn>
    <v-fade-transition mode="out-in">
      <v-row v-if="animais.length > 0" key="0">
        <PetCard v-for="animal in animais" v-bind:animal="animal" :key="animal.id" />
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import { todosAnimaisPorUsuario } from "@/services/AnimalService";

import PetCard from "@/components/Pet/PetCard";

export default {
  data: () => ({
    usuario: {},
    animais: [],
    errorMessage: ""
  }),
  components: {
    PetCard
  },
  methods: {
    ...mapGetters(["getUsuarioLogado"])
  },
  mounted() {
    this.usuario = this.getUsuarioLogado()
    todosAnimaisPorUsuario(this.usuario)
      .then(res => {
        this.animais = res.data;
      })
      .catch(err => {
        this.errorMessage = err;
      });
  }
};
</script>