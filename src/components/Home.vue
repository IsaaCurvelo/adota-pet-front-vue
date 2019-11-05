<template>
  <v-container
  class="fill-height"
  fluid >
  <h1>Stand Virtual</h1>
  <v-fade-transition mode="out-in">
    <v-row v-if="animais.length > 0" key="0">
    <PetCard v-for="animal in animais" v-bind:animal="animal" :key="animal.id"/>
    </v-row>
  </v-fade-transition>
  </v-container>
</template>


<script>
import PetCard from '@/components/Pet/PetCard'



export default {
  data() {
    return {
      animais: [
        {
          id: 1,
          nome: 'pretúncio',
          raca: 'vira-lata',
          bairro: 'Bequimão',
          imagem: 'https://placekitten.com/300/300',
        },
        {
          id: 2,
          nome: 'leozinho iti malia fera',
          raca: 'vira-lata',
          bairro: 'Anjo da Guarda',
          imagem: 'https://placekitten.com/300/300',
        },
        {
          id: 3,
          nome: 'Biridin',
          raca: 'pinsher',
          bairro: 'Barramar',
          imagem: 'https://placekitten.com/300/300',
        },
        {
          id: 4,
          nome: 'caroço',
          raca: 'hamster',
          bairro: 'Bequimão',
          imagem: 'https://placekitten.com/300/300',
        },
        {
          id: 5,
          nome: 'pretunço',
          raca: 'vira-lata',
          bairro: 'Bequimão',
          imagem: 'https://placekitten.com/300/300',
        },
        {
          id: 6,
          nome: 'leozinho',
          raca: 'vira-lata',
          bairro: 'Anjo da Guarda',
          imagem: 'https://placekitten.com/300/300',
        },
        {
          id: 7,
          nome: 'Biridin',
          raca: 'pinsher',
          bairro: 'Barramar',
          imagem: 'https://placekitten.com/300/300',
        },
        {
          id: 8,
          nome: 'caroço',
          raca: 'hamster',
          bairro: 'Bequimão',
          imagem: 'https://placekitten.com/300/300',
        },
      ],
    }
  },
  components: {
    PetCard,
  },
}
</script>