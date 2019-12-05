<template>
  <v-container fluid>
    <h1>Stand Virtual</h1>
    <v-fade-transition mode="out-in">
      <v-row v-if="animais.length > 0" key="0">
        <PetCard
          v-for="animal in animais"
          v-bind:animal="animal"
          :key="animal.id"
          v-on:adotar="mostrarDialog(animal)"
        />
      </v-row>

      <p v-else>Aninda não existem animais cadastrados no AdotaPET</p>
    </v-fade-transition>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Adotar um PET</span>
        </v-card-title>
        <form @submit.prevent="submit()">
          <v-card-text>
            <v-container>
              <p>Onde será o novo lar deste PET?</p>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="*logradouro" required v-model="form.logradouro" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="*cep" required v-model="form.cep" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="*bairro" required v-model="form.bairro" />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="*número"
                    hint="pode ser texto também"
                    required
                    v-model="form.numero"
                  />
                </v-col>
              </v-row>
            </v-container>
            <small>*campos obrigatórios</small>
          </v-card-text>
          <v-card-actions>
            <v-btn color="grey" text @click="dialog = false">fechar</v-btn>
            <v-spacer />
            <v-btn type="submit" color="green darken-1" text>adotar</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

    <v-snackbar color="success" :timeout="snackbarTimeout" v-model="snackbar" multi-line>
      Foi enviada uma solicitação de adoção para o atual dono do PET.
      Entre em contato com ele para combinar tudo direitinho.
      Assim que o atual dono confirmar, este PET aparecerá em "meus pets".
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>
import PetCard from "@/components/Pet/PetCard";

import { todosAnimais } from "@/services/AnimalService";
import { cadastrar } from "@/services/AdocaoService";

import { mapState } from "vuex";

export default {
  data: () => ({
    animais: [],
    animalSelecionado: null,
    form: {
      adotante: {},
      doador: {},
      animal: {},
      logradouro: "",
      cep: "",
      bairro: "",
      numero: ""
    },
    logado: false,
    dialog: false,
    snackbar: false,
    snackbarTimeout: 7000
  }),
  components: {
    PetCard
  },
  mounted() {
    todosAnimais()
      .then(response => {
        this.animais = response.data;
      })
      .catch(e => {
        console.log(e);
      });
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    mostrarDialog(animal) {
      this.animalSelecionado = animal;
      this.dialog = true;
    },

    submit() {
      this.form.doador = this.animalSelecionado.dono;
      this.form.adotante = this.usuario;
      this.form.animal = this.animalSelecionado;
      cadastrar(this.form)
        .then(res => {
          this.snackbar = true;
          this.dialog = false;
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
};
</script>