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
						<v-text-field :value="usuario.nome" disabled=""/>
						<v-btn text>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>email:</v-list-item-content>
						<v-text-field :value="usuario.email" disabled=""/>
						<v-btn text>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>telefone:</v-list-item-content>
						<v-text-field :value="usuario.telefone" disabled=""/>
						<v-btn text>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</v-list-item>
				</v-list>
			</v-card-text>
			<v-card-actions>
				<v-btn  color="success">
					<v-icon>mdi-content-save</v-icon> 
					salvar alterações
				</v-btn>
				<v-spacer/>
				<v-btn color="error">
					<v-icon>mdi-skull-crossbones</v-icon>
					alterar a senha
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
export default {
	data: () => ({
		usuario: {
			nome: 'isaac francis',
			email: 'isaac.francis@email.com',
			telefone: '(98)98265-2222',
		}
	})
}
</script>