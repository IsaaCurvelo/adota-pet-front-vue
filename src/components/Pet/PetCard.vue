<template>
  <v-col xs="12" md="3" lg="2">
    <v-hover v-slot:default="{ hover }">
      <v-card class="mx-auto" :elevation="hover ? 12 : 2">
        <v-img :src="animal | fullImgUrl" height="200" class="white--text align-end">
          <v-card-title>
            <div class="text-example">{{animal.nome}}</div>
          </v-card-title>
        </v-img>

        <div class="v-card__text text--primary">
          <p>{{ animal.raca.nome }}</p>
          <v-card-subtitle style="margin:0; padding:0" class="pb-0">{{animal.bairro}}</v-card-subtitle>
        </div>

        <v-card-actions>
          <v-btn v-if="usuario.id !== animal.dono.id" text @click="$emit('adotar', animal)" color="green">adotar</v-btn>
          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Informações do PET</v-list-item-title>

                    <v-list-item-subtitle>
                      <span class="text--primary">espécie/raça</span>
                      &mdash; {{ animal | especieRaca }}
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                      <span class="text--primary">idade</span>
                      &mdash; {{ animal.idade }} ano(s)
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                      <span class="text--primary">sexo</span>
                      &mdash; {{ animal | sexo }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Contato</v-list-item-title>
                    <v-list-item-subtitle>
                      <span class="text--primary">{{animal.dono.nome}}</span>
                      &mdash; {{ animal.dono.telefone }}
                    </v-list-item-subtitle>

                    <v-list-item-subtitle>
                      <span class="text--primary">email</span>
                      &mdash; {{ animal.dono.email }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PetCard",
  props: ["animal"],
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState(["usuario"])
  },
  filters: {
    fullImgUrl(value) {
      return `http://localhost:6969${value.foto}`;
    },
    sexo(value) {
      return value.sexo === "M" ? "macho" : "fêmea";
    },
    especieRaca(value) {
      return `${value.raca.especie.nome}/${value.raca.nome}`;
    }
  }
};
</script>

<style lang="sass">
  .text-example
    background-color: rgba(0, 0, 0, .4)
    padding: 0 10px 0 10px
    border-radius: 4px
</style>