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


          <v-text-field type="text" label="nome" v-model="form.nome" />
          <v-row>
            <v-col>
              <v-text-field type="text" label="idade" width="50%" v-model="form.idade"/>
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

          <v-file-input v-model="imagem" accept="image/jpeg" label="foto do pet" dense outlined/>

          <v-chip color="success">
            <v-avatar left class="green darken-3">3</v-avatar>
            endereço
            <v-icon right>mdi-map-marker</v-icon>
          </v-chip>

          <v-text-field type="text" label="logradouro" v-model="form.logradouro" />
          <v-text-field type="text" label="cep" v-model="form.cep" />
          <v-text-field type="text" label="bairro" v-model="form.bairro" />
          <v-text-field type="text" label="numero" v-model="form.numero" />
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
    
    <v-snackbar top vertical v-model="snackbarSucesso" color="success" :timeout="snackbarTimeOut">
      Animal cadastrado com sucesso! Redirecionando para meus pets...
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar" color="info" :timeout="snackbarTimeOut">
      Se não aparecer a espécie ou a raça que deseja cadastrar, pode apenas digitar que o
      AdotaPET vai cadastrar para você.
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

import * as especieService from "@/services/EspecieService"
import * as racaService from "@/services/RacaService"
import * as animalService from "@/services/AnimalService"

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
    imagem: null,
    especieSelecionada: {},
    racaSelecionada: {},
    especies: [],
    racas: [],
    snackbar: true,
    snackbarSucesso: false,
    snackbarTimeOut: 7000
  }),
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    buscaRacas(especie) {
      racaService.todasRacasPorEspecie(especie)
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

    async submit() {
      if (!this.racaSelecionada.id) {
        console.log("nao tem a raca")
        if(!this.especieSelecionada.id) {
          this.especieSelecionada = {nome: this.especieSelecionada}
          console.log("nem a especie")
        }

        await racaService.cadastrar({nome: this.racaSelecionada, especie: this.especieSelecionada})
        .then( response => {
          this.racaSelecionada = response.data
          console.log("cadastrou")
        })
        .catch (error => {
          console.log(error)
        })
      }

      this.form.raca = this.racaSelecionada
      this.form.doador = this.usuario
      let formData =  new FormData();
      formData.append('imagem', this.imagem)
      formData.append('animal', JSON.stringify(this.form))
      
      animalService.cadastrar(formData)
      .then(res => {
        this.snackbarSucesso = true
        console.log(res)
        setTimeout( () => this.$router.push("/"), this.snackbarTimeOut)
      })
      .catch( err => {
        console.log(err)
      })
    }
  },

  async mounted() {
    await especieService.todasEspecies()
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