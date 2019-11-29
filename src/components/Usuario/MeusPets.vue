<template>
  <v-container fluid>
    <h2>Meus Pets</h2>
    <v-btn large color="success" to="/meus-pets/novo">
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
import { mapState } from "vuex";

import { todosAnimaisPorUsuario } from "@/services/AnimalService";

import PetCard from "@/components/Pet/PetCard";

export default {
  data: () => ({
    animais: [],
    errorMessage: ""
  }),
  components: {
    PetCard
  },
  computed: {
    ...mapState(["usuario"])
  },
  mounted() {
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