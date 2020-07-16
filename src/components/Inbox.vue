<template>
	<v-card class="mx-2 mt-5">
		<v-list subheader>
			<v-subheader>Chat Recientes</v-subheader>

			<v-list-item
				v-for="item in conversacionFiltrada"
				:key="item._id"
				@click="$router.push({name: 'Conversacion', params: {idConversacion: item._id}})"
			>
				<v-list-item-avatar>
					<v-img :src="$serverURL + item.avatar"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ item.id_mostrar }}</v-list-item-title>
				</v-list-item-content>
				<v-list-item-icon>
					<v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-message</v-icon>
				</v-list-item-icon>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>

		<v-list subheader>
			<v-subheader>Chat</v-subheader>
			<v-list-item v-for="item in items2" :key="item.title">
				<v-list-item-avatar>
					<v-img :src="item.avatar"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.title"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>
<script>
import { getConversaciones } from "../services/sConversacion";
import { getUsuario } from "../services/sUsuario";
import { log } from "util";

export default {
	data: () => ({
		items: [],
		items2: [],
		conversacionFiltrada: []
	}),

	methods: {
		filtrarConversaciones: function() {
			this.items.forEach(conv => {
				if (conv.id_sender == this.$store.state.usuario.id) {
					getUsuario(conv.id_receiver, this.$store.state.usuario.token)
						.then(res => {
							conv.id_mostrar = res.data.nombre + " " + res.data.apellido;
							conv.avatar = res.data.profile_image;
							this.conversacionFiltrada.push(conv)
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					getUsuario(conv.id_sender, this.$store.state.usuario.token)
						.then(res => {
							conv.id_mostrar = res.data.nombre + " " + res.data.apellido;
							conv.avatar = res.data.profile_image;
							this.conversacionFiltrada.push(conv)
						})
						.catch(error => {
							console.log(error);
						});
				}
				console.log(this.conversacionFiltrada);
			});
		}
	},

	created: function() {
		getConversaciones(this.$store.state.usuario.token)
			.then(res => {
				this.items = res.data;
				this.filtrarConversaciones();
				console.log();
			})
			.catch(error => {
				console.log(error);
			});
	}
};
</script>
