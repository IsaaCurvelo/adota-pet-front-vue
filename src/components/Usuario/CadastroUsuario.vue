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
              prepend-icon="mdi-account-card-details-outline"
            />
            <v-text-field 
              label = "email"
              prepend-icon="mdi-at"
            />
            <v-text-field 
              label = "telefone"
              prepend-icon="mdi-cellphone-android"
            />
            <v-text-field 
              :type="showPassword ? 'text' : 'password'" 
              label = "senha"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
             <v-text-field 
              :type="showPassword ? 'text' : 'password'" 
              label = "confirmação de senha"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-btn router to="/logar" color="success">entrar</v-btn>
          <v-spacer/>
          <v-btn color="info">criar conta</v-btn>
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
    }
  },
}
</script>