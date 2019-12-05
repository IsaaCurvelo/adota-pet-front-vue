<template>
  <v-col xs="12" md="12" lg="6">
    <v-hover v-slot:default="{ hover }">
      <v-card class="">
        <v-container >
          <v-row>
            <v-col cols="auto">
              <v-img height="250" width="250" :src="adocao | fullImgUrl"></v-img>
            </v-col>

            <v-col cols="" class="text-left pl-0">
              <v-row class="flex-column ma-0 fill-height" justify="center">
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">mdi-paw</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ adocao.animal.nome }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ adocao.adotante.nome }}</v-list-item-title>
                      <v-list-item-subtitle>{{ adocao | contatoAdotante }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action></v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{ adocao | ruaNumero }}</v-list-item-title>
                      <v-list-item-subtitle>{{ adocao | cepBairro }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text @click="$emit('recusar-adocao', adocao)" color="red">recusar adoção</v-btn>
                    <v-spacer />
                    <v-btn text @click="$emit('confirmar-adocao', adocao)" color="success">confirmar adoção</v-btn>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  name: "PetCardConfirmacao",
  props: ["adocao"],
  filters: {
    fullImgUrl(value) {
      return `http://localhost:6969${value.animal.foto}`;
    },
    contatoAdotante(value) {
      return `${value.adotante.email} - ${value.adotante.telefone}`;
    },
    ruaNumero(value) {
      return `${value.logradouro}, ${value.numero}`;
    },
    cepBairro(value) {
      return `${value.cep}, ${value.bairro}`;
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