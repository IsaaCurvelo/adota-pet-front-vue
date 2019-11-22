<template>
  <div>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display1">Login</h1>
      </v-card-title>
      <form @submit.prevent="logar()">
        <v-card-text>
          <v-text-field label="email" prepend-icon="mdi-account-circle" v-model="form.email" />
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
          <v-btn type="submit" color="danger" :disabled="!formIsValid">entrar</v-btn>
          <v-spacer />
          <v-btn text to="/registrar" color="info">criar conta</v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <v-snackbar v-model="snackbar" color="red lighten-1">
      O email ou senha informados estão incorretos.
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  name: "LoginUsuario",
  data: () => ({
    form: {
      email: "",
      senha: ""
    },
    showPassword: false,
    snackbar: false
  }),
  computed: {
    formIsValid() {
      return this.email !== "" && this.senha !== "";
    }
  },
  methods: {
    ...mapActions(['doLogin']),
    logar() {
      this.doLogin(this.form).then(res => {
        console.log(res.data)
      })
    }
  }
};
</script>