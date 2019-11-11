<template>
  <v-container fluid>
    <h1>Stand Virtual</h1>
    <p v-if="logado">{{this.$store.usuario.nome}}</p>
    <p>{{logado}}</p>
    <v-fade-transition mode="out-in">
      <v-row v-if="animais.length > 0" key="0">
        <PetCard v-for="animal in animais" v-bind:animal="animal" :key="animal.id" />
      </v-row>
    </v-fade-transition>
  </v-container>
</template>


<script>
import PetCard from "@/components/Pet/PetCard";
import axios from "axios";

export default {
  data() {
    return {
      animais: [],
      logado: false,
    };
  },
  components: {
    PetCard
  },
  mounted() {
    this.logado = this.$store.usuario != null;

    axios.get("http://localhost:6969/animais").then(response => {
      this.animais = response.data.content;
    });
  }
};
</script>