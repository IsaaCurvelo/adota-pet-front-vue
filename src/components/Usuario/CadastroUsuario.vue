<template>
  <div>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display1">Criar conta</h1>
      </v-card-title>
      <form @submit.prevent="submit()">
        <v-card-text>
          <v-text-field
            label="nome"
            v-model="form.nome"
            prepend-icon="mdi-account-card-details-outline"
          />
          <v-text-field label="email" type="email" v-model="form.email" prepend-icon="mdi-at" />
          <v-text-field
            label="telefone"
            v-model="form.telefone"
            prepend-icon="mdi-cellphone-android"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="senha"
            v-model="form.senha"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn type="submit" color="info" :disabled="!formIsValid">criar conta</v-btn>
          <v-spacer />
          <v-btn text to="/logar" color="success">já tenho uma conta</v-btn>
        </v-card-actions>
      </form>
    </v-card>

    <v-snackbar v-model="snackbar" :color="color" :timeout="snackbarTimeOut">
      {{ message }}
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>


<script>
import { mapActions } from "vuex";

import { cadastrar } from "@/services/UsuarioService";

export default {
  name: "LoginUsuario",
  data: () => ({
    form: {
      showPassword: false,
      nome: '',
      email: '',
      telefone: '',
      senha: ''
    },
    color: 'red lighten-1',
    message: '',
    showPassword: false,
    snackbar: false,
    snackbarTimeOut: 4000
  }),
  computed: {
    formIsValid() {
      return (
        this.form.nome !== '' &&
        this.form.email !== '' &&
        this.form.telefone !== '' &&
        this.form.senha !== ''
      );
    }
  },
  methods: {
    ...mapActions(["doLogin"]),

    submit() {
      cadastrar(this.form)
        .then(response => {

          this.doLogin(response.data);
          
          this.color = 'teal accent-4'
          this.snackbar = true;
          this.message = "Conta criada com sucesso! Redirecionando para a página inicial...";

          setTimeout( () => this.$router.push("/"), this.snackbarTimeOut);
        })
        .catch(err => {
          this.color = 'red lighten-1'
          this.snackbar = true;
          this.message = err;
        });
    }
  }
};
</script>