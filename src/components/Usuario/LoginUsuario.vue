<template>
  <div>
    <v-row></v-row>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display1">Login</h1>
      </v-card-title>
      <v-card-text>
        <form @submit.prevent>
          <v-text-field label="email" prepend-icon="mdi-account-circle" v-model="usuario.email" />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="senha"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="usuario.senha"
          />
        </form>

        <p>{{this.usuario}}</p>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn @click="logar" color="danger" :disabled="!formIsValid">entrar</v-btn>
        <v-spacer />
        <v-btn text to="/registrar" color="info">criar conta</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" color="red lighten-1">
      O email ou senha informados estão incorretos.
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "LoginUsuario",
  data() {
    return {
      showPassword: false,
      snackbar: false,
      usuario: {
        email: "",
        senha: ""
      }
    };
  },
  computed: {
    formIsValid() {
      return this.usuario.email !== "" && this.usuario.senha !== "";
    }
  },
  methods: {
    logar() {
      axios
        .post("http://localhost:6969/usuarios/logar", this.usuario, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          if (response.status == 200) {
            this.usuario = response.data;
          } else {
            this.snackbar = true;
          }
        });
    }
  }
};
</script>