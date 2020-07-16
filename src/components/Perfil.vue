<template>
	<v-container>
		<v-layout justify-center>
			<v-flex xs12 sm8 md4>
				<!-- Datos del perfil -->
				<v-card class="elevation-4 mb-6">
					<v-layout>
						<div style="width:120px; height:120px">
							<router-link to="/editarp">
								<v-avatar size="120" tile>
									<img :src="$serverURL + usuario.profile_image" />
								</v-avatar>
							</router-link>
						</div>
						<v-flex>
							<span class="title ml-3">{{ usuario.nombre }} {{ usuario.apellido }}</span>
							<br />
							<span
								class="subtitle-1 ml-3"
								style="color:gray"
							>{{usuario.id_estado.nombre}}, {{usuario.ciudad}}</span>
							<v-divider></v-divider>
							<v-card-actions>
								<v-btn icon small to="/editarp">
									<v-icon>mdi-account-edit</v-icon>
								</v-btn>
								<v-btn icon small :to="{name:'ListaAmigos',params:{idUsuario:usuario._id}}">
									<v-icon>mdi-account-group</v-icon>
								</v-btn>
							</v-card-actions>
						</v-flex>
					</v-layout>
				</v-card>

				<!-- Ultimas publicaciones -->
				<center>
					<h3>
						<span style="color:gray">Ultimas publicaciones</span>
					</h3>
				</center>

				<!-- Comienzo de publicaciones-->
				<ba-publicacion
					v-for="pub in publicaciones"
					:key="pub._id"
					:pub="pub"
					:showImage="pub.show_image"
				></ba-publicacion>
				<!-- Fin publicaciones -->

				<!-- Ver mas publicaciones -->
				<v-btn block color="primary" @click="ultimasPublicaciones()">Ver mas...</v-btn>

				<!-- Notificaciones -->
				<v-snackbar
					v-model="dialog.isOpen"
					:color="dialog.color"
					:timeout="dialog.timeout"
					top
					style="margin-top:55px"
				>
					{{ dialog.message }}
					<v-btn dark text @click="dialog.isOpen = false">Close</v-btn>
				</v-snackbar>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { getPublicacionesUser } from "../services/sPublicacion";
import { getUsuario } from "../services/sUsuario";
import { getImagenesPub } from "../services/sImagenes";
import Publicacion from "./Publicacion.vue";

export default {
	props: {
		source: String
	},
	data: () => ({
		publicaciones: [],
		usuario: "",
		from: 0,
		to: 3,
		imagenes: [],
		dialog: {
			isOpen: false,
			color: "red",
			timeout: 3000,
			message: ""
		}
	}),

	components: {
		BaPublicacion: Publicacion
	},

	methods: {
		ultimasPublicaciones: function() {
			getPublicacionesUser(this.$store.state.usuario.id, this.from, this.to)
				.then(res => {
					res.data.forEach(pub => {
						var pos = this.publicaciones.push(pub);
						// Buscamos las imagenes de cada publicacion
						getImagenesPub(pub._id)
							.then(res => {
								this.imagenes[pos - 1] = res.data;
								this.publicaciones[pos - 1].imagenes = res.data;
								if (res.data.length === 0) {
									this.publicaciones[pos - 1].show_image = false;
								} else {
									this.publicaciones[pos - 1].show_image = true;
								}
								// Volveamos a setear la publicacion para activar la reactividad
								this.$set(
									this.publicaciones,
									pos - 1,
									this.publicaciones[pos - 1]
								);
							})
							.catch(error => console.log(error));
					});
					if (this.publicaciones.length !== 0 && res.data.length === 0) {
						this.dialog.message =
							"No existen mas publicaciones por los momentos.";
						this.dialog.color = "blue";
						this.dialog.isOpen = true;
					}
					this.from += 3;
					this.to += 3;
				})
				.catch(error => {
					console.log(error);
				});
		}
	},

	created: function() {
		// Cargamos los estados
		getUsuario(this.$store.state.usuario.id)
			.then(res => {
				this.usuario = res.data;
				console.log(res.data);
			})
			.catch(error => {
				console.log(error);
			});

		// Cargamos publicaciones
		this.ultimasPublicaciones();
	}
};
</script>