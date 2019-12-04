<template>
  <v-col xs="12" md="3" lg="2">
    <v-hover v-slot:default="{ hover }">
    <v-card 
      class="mx-auto" 
      :elevation="hover ? 12 : 2"
    >
      <v-img
        :src="animal | fullImgUrl"
        height="200"
        class="white--text align-end"
      >
        <v-card-title>
          <div class="text-example">{{animal.nome}}</div>
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{animal.bairro}}
      </v-card-subtitle>
      
      <v-card-text class="text--primary">
        <div>{{animal.raca.nome}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="orange"
          text
        >
          detalhes
        </v-btn>
        <v-btn
          color="green"
          text
        >
          adotar
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  name: 'PetCard',
  props: ['animal'],
  filters: {
    fullImgUrl(value) {
      return `http://localhost:6969${value.foto}`;
    }
  }
}
</script>

<style lang="sass">
  .text-example
    background-color: rgba(0, 0, 0, .4)
    padding: 0 10px 0 10px
    border-radius: 4px
</style>