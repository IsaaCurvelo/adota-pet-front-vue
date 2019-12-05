<template>
  <v-container fluid>
    <h2>Meus Pets</h2>
    <v-row>
      <v-col xs="12" md="3" lg="2">
        <v-btn large color="success" to="/meus-pets/novo" style="width: 100%">
          <v-icon>mdi-plus</v-icon>cadastrar
        </v-btn>
      </v-col>
      <v-col xs="12" md="3" lg="2">
        <v-btn large color="info" to="/meus-pets/confirmacoes" style="width: 100%">
          <v-icon>mdi-cat</v-icon>confirmar doações
        </v-btn>
      </v-col>
    </v-row>
    <v-divider/>
    <v-divider/>
    <v-fade-transition mode="out-in">
      <v-row v-if="animais.length > 0" key="0">
        <PetCardPerfil
          v-for="animal in animais"
          v-bind:animal="animal"
          :key="animal.id"
          v-on:snackbar-sucesso="snackbarSucesso"
          v-on:snackbar-nao-implementado="snackbarNaoImplementado"
        />
      </v-row>
    </v-fade-transition>

    <v-snackbar :color="snackbarCor" :timeout="snackbarTimeout" v-model="snackbar">
      {{ snackbarMensagem }}
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import { todosAnimaisPorUsuario } from "@/services/AnimalService";

import PetCardPerfil from "@/components/Pet/PetCardPerfil";

export default {
  data: () => ({
    animais: [],
    snackbar: false,
    snackbarTimeout: 3500,
    snackbarCor: "",
    snackbarMensagem: ""
  }),
  components: {
    PetCardPerfil
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    snackbarSucesso() {
      this.snackbarMensagem = "alteração realizada com sucesso";
      this.snackbarCor = "success";
      this.snackbarTimeout = 1500;
      this.snackbar = true;
    },

    snackbarNaoImplementado() {
      this.snackbarMensagem = "funcionalidade ainda não implementada";
      this.snackbarCor = "info";
      this.snackbarTimeout = 3500;
      this.snackbar = true;
    }
  },
  mounted() {
    todosAnimaisPorUsuario(this.usuario)
      .then(res => {
        this.animais = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>