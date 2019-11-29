<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <h3>Novo Pet</h3>
    </v-card-title>
    <form @submit.prevent="submit()">
      <v-card-text>
        <v-combobox label="especie" :items="especies"></v-combobox>

        <v-combobox label="raça" :items="racas"></v-combobox>

        <v-text-field type="nome" label="nome" />
      </v-card-text>
      <v-card-actions></v-card-actions>
    </form>
  </v-card>
</template>