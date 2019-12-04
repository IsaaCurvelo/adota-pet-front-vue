<template>
  <div>
    <v-card width="600" class="mx-auto mt-5">

      <v-card-title class="cyan darken-1">
          <span class="headline white--text">Meu Perfil</span>
          <v-spacer></v-spacer>
          <v-btn dark icon @click="sair">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>nome completo:</v-list-item-content>
            <v-text-field v-model="form.nome" :disabled="!editNome" />
            <v-btn text @click="editNome = !editNome">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>email:</v-list-item-content>
            <v-text-field v-model="form.email" :disabled="!editEmail" />
            <v-btn text @click="editEmail = !editEmail">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>telefone:</v-list-item-content>
            <v-text-field v-model="form.telefone" :disabled="!editTelefone" />
            <v-btn text @click="editTelefone = !editTelefone">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="salvarAlteracoes" color="success">
          <v-icon>mdi-content-save</v-icon>salvar
        </v-btn>
        <v-spacer />
        <v-btn color="error" @click.stop="dialog = true">
          <v-icon>mdi-skull-crossbones</v-icon>alterar a senha
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Digite a nova senha</span>
        </v-card-title>
        <v-form @submit.prevent="alterar()">
          <v-card-text>
            <v-text-field required v-model="novaSenha"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red " type="submit" text>alterar</v-btn>
            <v-btn text @click="dialog = false; novaSenha=''">Fechar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :timeout="snackbarTimeOut">
      {{ mensagem }}
      <v-btn color="white" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { alterarSenha, alterarUsuario } from "@/services/UsuarioService";
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    form: {
      nome: "",
      email: "",
      telefone: "",
    },
    editNome: false,
    editEmail: false,
    editTelefone: false,
    novaSenha: "",
    mensagem: "",
    snackbarTimeOut: 3000,
    snackbar: false,
    dialog: false,
    color: "",
    message: ""
  }),
  mounted() {
    this.form.nome = this.usuario.nome
    this.form.email = this.usuario.email
    this.form.telefone = this.usuario.telefone
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    ...mapActions(["doLogin", "doLogout"]),

    showSnackBar(color, mensagem){
      this.mensagem = mensagem
      this.color = color
      this.snackbar = true
    },

    async salvarAlteracoes() {
      this.form.id = this.usuario.id

      await alterarUsuario(this.form)
        .then(response => {
          this.doLogin(response.data)
          this.showSnackBar('teal accent-4', "Informações alteradas com sucesso!")
        })
        .catch(err => {
          this.showSnackBar('red lighten-1', err)
        })
      this.editNome = this.editEmail = this.editTelefone = false
    },

    async alterar() {
      this.usuario.senha = this.novaSenha;
      await alterarSenha(this.usuario)
        .then(response => {
          this.doLogin(response.data)
          this.showSnackBar('teal accent-4', "Senha alterada com sucesso!")
        })
        .catch(err => {
          this.showSnackBar('red lighten-1', err)
        })
      this.dialog = false
    },
    sair() {
      this.doLogout()
      this.$router.push("/")
    }
  }
};
</script>