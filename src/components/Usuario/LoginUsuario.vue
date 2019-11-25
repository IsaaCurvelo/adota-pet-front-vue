<template>
  <div>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display1">Login</h1>
      </v-card-title>
      <form @submit.prevent="submit()">
        <v-card-text>
          <v-text-field
            type="email"
            label="email"
            prepend-icon="mdi-account-circle"
            v-model="form.email"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="senha"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="form.senha"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn type="submit" color="success" :disabled="!formIsValid">entrar</v-btn>
          <v-spacer />
          <v-btn text to="/registrar" color="info">ainda não tenho conta</v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <v-snackbar v-model="snackbar" color="red lighten-1" :timeout="snackbarTimeOut">
      o login ou senha informados são inválidos
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>


<script>
import { mapActions } from "vuex";

import { logar } from "@/services/UsuarioService";

export default {
  name: "LoginUsuario",
  data: () => ({
    form: {
      email: "",
      senha: ""
    },
    errorMessage: "",
    showPassword: false,
    snackbar: false,
    snackbarTimeOut: 2500
  }),
  computed: {
    formIsValid() {
      return this.form.email !== "" && this.form.senha !== "";
    }
  },
  methods: {
    ...mapActions(["doLogin"]),

    submit() {
      logar(this.form)
        .then(response => {
          this.doLogin(response.data);
          this.$router.push("/");
        })
        .catch(err => {
          this.snackbar = true;
          this.errorMessage = err;
        });
    }
  }
};
</script>