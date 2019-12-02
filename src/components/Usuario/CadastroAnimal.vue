<template>
  <div>
    <v-card width="600" class="mx-auto mt-5">
      <v-card-title>
        <h3>Novo Pet</h3>
      </v-card-title>
      <form @submit.prevent="submit()">

        <v-card-text>
          <v-chip color="primary">
            <v-avatar left class="blue darken-3">1</v-avatar>
            espécie e raça
            <v-icon right>mdi-file-tree</v-icon>
          </v-chip>

          <v-combobox
            style="margin-top:30px"
            @input="selecionaEspecie"
            outlined
            dense
            label="especie"
            v-model="especieSelecionada"
            :items="especies"
            item-text="nome"
            item-value="id"
          />
          <v-combobox
            append-icon="mdi-information-outline"
            @click:append="snackbar = ! snackbar"
            outlined
            dense
            label="raça"
            v-model="racaSelecionada"
            :items="racas"
            item-text="nome"
            item-value="id"
          />
          
          <v-chip color="info">
            <v-avatar left class="light-blue darken-3">2</v-avatar>
            pet
            <v-icon right>mdi-cat</v-icon>
          </v-chip>


          <v-text-field type="text" label="nome" />
          <v-row>
            <v-col>
              <v-text-field type="text" label="idade" width="50%" />
            </v-col>
            <v-col>
              <v-radio-group v-model="form.sexo">
                <v-radio label="fêmea" value="F" color="primary"></v-radio>
                <v-radio label="macho" value="M" color="primary"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <v-checkbox v-model="form.paraAdocao" label="para adoção" color="primary"></v-checkbox>
            </v-col>
          </v-row>

          <v-file-input accept="image/jpeg" label="foto do pet">

          </v-file-input>

          <v-chip color="success">
            <v-avatar left class="green darken-3">3</v-avatar>
            endereço
            <v-icon right>mdi-map-marker</v-icon>
          </v-chip>

          <v-text-field type="text" label="logradouro" />
          <v-text-field type="text" label="cep" />
          <v-text-field type="text" label="bairro" />
          <v-text-field type="text" label="numero" />
        </v-card-text>

        <v-card-actions>
          <v-btn
            :disabled="snackbar"
            @click="snackbar = !snackbar"
            text
            fab
            bottom
            left
            color="info"
          >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn type="submit" color="success">
            <v-icon>mdi-content-save</v-icon>cadastrar
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <v-snackbar v-model="snackbar" color="info" :timeout="snackbarTimeOut">
      Se não aparecer a espécie ou a raça que deseja cadastrar, pode apenas digitar que o
      AdotaPET vai cadastrar para você.
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { todasEspecies } from "@/services/EspecieService";
import { todasRacasPorEspecie } from "@/services/RacaService";

export default {
  data: () => ({
    form: {
      nome: "",
      idade: 0,
      sexo: "F",
      paraAdocao: true,
      raca: {},
      doador: {},
      logradouro: "",
      cep: "",
      bairro: "",
      numero: ""
    },
    especieSelecionada: {},
    racaSelecionada: {},
    especies: [],
    racas: [],
    snackbar: true,
    snackbarTimeOut: 7000
  }),

  methods: {
    buscaRacas(especie) {
      todasRacasPorEspecie(especie)
        .then(res => {
          this.racas = res.data;
          if (this.racas.length > 0) {
            this.racaSelecionada = this.racas[0];
          } else {
            this.racaSelecionada = "";
            this.racas = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    selecionaEspecie() {
      if (this.especieSelecionada.id) {
        this.buscaRacas(this.especieSelecionada);
      } else {
        this.racas = [];
        this.racaSelecionada = "";
      }
    },

    submit() {
      console.log(this.especieSelecionada);
    }
  },

  async mounted() {
    await todasEspecies()
      .then(response => {
        this.especies = response.data;

        if (this.especies.length > 0) {
          this.especieSelecionada = this.especies[0];
          this.racaNova = false;
        } else {
          this.racaNova = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
    if (!this.racaNova) {
      this.buscaRacas(this.especieSelecionada);
    }
  }
};
</script>