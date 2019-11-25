<template>
  <v-container fluid>
    <h1>Stand Virtual</h1>
    <v-fade-transition mode="out-in">
      <v-row v-if="animais.length > 0" key="0">
        <PetCard v-for="animal in animais" v-bind:animal="animal" :key="animal.id" />
      </v-row>
    </v-fade-transition>
  </v-container>
</template>


<script>
import PetCard from "@/components/Pet/PetCard";

import { todosAnimais } from "@/services/AnimalService";

export default {
  data: () => ({
    animais: [],
    logado: false
  }),
  components: {
    PetCard
  },
  mounted() {
    todosAnimais()
      .then(response => {
        this.animais = response.data.content;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>