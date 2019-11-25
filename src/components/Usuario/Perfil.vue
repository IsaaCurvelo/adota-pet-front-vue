<template>
  <div>
    <v-card width="600" class="mx-auto mt-5">
      <v-card-title>
        <h4 class="display1">Meu perfil</h4>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>nome completo:</v-list-item-content>
            <v-text-field :v-model="usuario.nome" :disabled="!editNome" />
            <v-btn text @click="editNome = !editNome">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>email:</v-list-item-content>
            <v-text-field :v-model="usuario.email" :disabled="!editEmail" />
            <v-btn text @click="editEmail = !editEmail">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>telefone:</v-list-item-content>
            <v-text-field :v-model="usuario.telefone" :disabled="!editTelefone" />
            <v-btn text @click="editTelefone = !editTelefone">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="salvarAlteracoes" color="success">
          <v-icon>mdi-content-save</v-icon>salvar alterações
        </v-btn>
        <v-spacer />
        <v-btn color="error">
          <v-icon>mdi-skull-crossbones</v-icon>alterar a senha
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" :timeout="snackbarTimeOut">
      {{ message }}
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    usuario: {},
    editNome: false,
    editEmail: false,
    editTelefone: false,
    snackbarTimeOut: 3000,
		snackbar: false,
		color: '',
		message: ''
  }),
  mounted() {
    this.usuario = this.getUsuarioLogado();
  },
  methods: {
    ...mapGetters(["getUsuarioLogado"]),
    salvarAlteracoes() {
			const usuarioLogado = this.getUsuarioLogado()
			console.log(usuarioLogado)
			console.log(this.usuario)
      if (JSON.stringify(usuarioLogado) === JSON.stringify(this.usuario)) {
				this.color = 'red lighten-1'
				this.message = 'não houve nenhuma alteração nas informações do usuário'
        this.snackbar = true;
      } else {
				this.color = 'teal accent-4'
				this.message = 'alterações efetuadas com sucesso'
				this.snackbar = true;
			}
    }
  }
};
</script>