<template>
    <div>
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display1">Criar conta</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field 
              label = "nome"
              v-model="nome"
              prepend-icon="mdi-account-card-details-outline"
            />
            <v-text-field 
              label = "email"
              v-model="email"
              prepend-icon="mdi-at"
            />
            <v-text-field 
              label = "telefone"
              v-model="telefone"
              prepend-icon="mdi-cellphone-android"
            />
            <v-text-field 
              :type="showPassword ? 'text' : 'password'" 
              label = "senha"
              v-model="senha"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-btn color="info" :disabled="!formIsValid">criar conta</v-btn>
          <v-spacer/>
          <v-btn text to="/logar" color="success">entrar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>


<script>
export default {
  name : 'LoginUsuario',
  data() {
    return {
      showPassword: false,
      nome: '',
      email: '',
      telefone: '',
      senha: '',
    }
  },
  computed: {
    formIsValid() {
      return this.nome !== '' && this.email !== '' && this.telefone !== '' 
        && this.senha !== '';
    }
  }
}
</script>