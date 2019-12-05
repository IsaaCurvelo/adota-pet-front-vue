<template>
  <v-container fluid>
    <h2>Confirmar Adoções</h2>
    <v-divider />
    <v-divider />
    <v-fade-transition mode="out-in">
      <v-row v-if="adocoes.length > 0" key="0">
        <PetCardConfirmacao
          v-for="adocao in adocoes"
          v-bind:adocao="adocao"
          :key="adocao.id"
          v-on:recusar-adocao="mostrarDialogRecusar(adocao)"
          v-on:confirmar-adocao="mostrarDialogConfirmar(adocao)"
        />
      </v-row>
    </v-fade-transition>

    <v-dialog v-model="dialogConfirmar" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Você confirma essa adoção?</v-card-title>
        <v-card-text>
          Depois desta ação não será possível voltar atrás.
          O AdotaPET não se responsabiliza por quaisquer interações entre os usuários.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogConfirmar = false">ainda não</v-btn>
          <v-btn color="green darken-1" text @click="confirmarAdocao">confirmo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogRecusar" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Você confirma essa exclusão?</v-card-title>
        <v-card-text>Depois desta ação não será possível voltar atrás.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogRecusar = false">ainda não</v-btn>
          <v-btn color="green darken-1" text @click="recusarAdocao">confirmo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar :color="snackbarCor" :timeout="snackbarTimeout" v-model="snackbar">
      {{ snackbarMensagem }}
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import * as adocaoService from "@/services/AdocaoService";

import PetCardConfirmacao from "@/components/Pet/PetCardConfirmacao";

export default {
  data: () => ({
    adocoes: [],
    adocaoSelecionada: null,
    snackbar: false,
    dialogConfirmar: false,
    dialogRecusar: false,
    snackbarTimeout: 2000,
    snackbarCor: "",
    snackbarMensagem: ""
  }),
  components: {
    PetCardConfirmacao
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    mostrarDialogConfirmar(adocao) {
      this.adocaoSelecionada = adocao;
      this.dialogConfirmar = true;
    },

    mostrarDialogRecusar(adocao) {
      this.adocaoSelecionada = adocao;
      this.dialogRecusar = true;
    },

    confirmarAdocao() {
      adocaoService
        .confirmarAdocao(this.adocaoSelecionada)
        .then(res => {
          this.snackbarMensagem =
            "adoção confirmada com sucesso...";
          this.snackbarCor = "success";
          this.dialogConfirmar = false;
          this.snackbar = true;
          adocaoService
            .todasAdocoesaConfirmar(this.usuario)
            .then(res => {
              this.adocoes = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.snackbarMensagem =
            "erro ao tentar confirmar adocao... contate o suporte do AdotaPet";
          this.snackbarCor = "red";
          this.snackbar = true;
        });
    },

    recusarAdocao() {
      adocaoService
        .deletarAdocao(this.adocaoSelecionada)
        .then(res => {
          this.snackbarMensagem = "adoção deletada com sucesso...";
          this.snackbarCor = "success";
          this.dialogRecusar = false;
          this.snackbar = true;
          adocaoService
            .todasAdocoesaConfirmar(this.usuario)
            .then(res => {
              this.adocoes = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.snackbarMensagem =
            "erro ao tentar confirmar adocao... contate o suporte do AdotaPet";
          this.snackbarCor = "red";
          this.snackbar = true;
        });
    }
  },
  mounted() {
    adocaoService
      .todasAdocoesaConfirmar(this.usuario)
      .then(res => {
        this.adocoes = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

