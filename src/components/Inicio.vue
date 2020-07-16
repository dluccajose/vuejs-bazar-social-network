<template>

	<!-- Contenedor principal -->
	<v-container>

		<!-- Mensaje de 0 resultados -->
		<v-container v-show="publicaciones.length === 0">
			<v-row class="justify-center">
				<v-icon size=150>mdi-emoticon-sad-outline</v-icon>
			</v-row>
			<v-row class="justify-center">
				<p class="title text-justify px-3" style="color:#828282">No hay publicaciones para mostrar en este momento. Intenta
					seguir una categoria o agregar un nuevo amigo.
				</p>
			</v-row>	
		</v-container>

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
	</v-container>
</template>

<script>
import { guestGetTimeline, userHomeTimeline } from "../services/sTimeline";
import { getImagenesPub } from "../services/sImagenes";
import Publicacion from "./Publicacion.vue";

export default {
	name: "Timeline",
	data() {
		return {
			items2: [
				{
					src: "https://image.prntscr.com/image/q9EP1WZBTLS-u4FtCUPK8A.png"
				},
				{
					src: "https://image.prntscr.com/image/qWiydeDaTEmKzI_m-TxG-A.png"
				}
			],
			publicaciones: [],
			imagenes: [],
			firstPost: 0, // Sirve como indicador para cargar nuevas publicaciones en el timeline
			lastPost: 2,
			dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			}
		};
	},

	components: {
		BaPublicacion: Publicacion
	},

	computed: {
		isLogged() {
			if (this.$store.state.usuario.token) {
				return true;
			} else {
				return false;
			}
		}
	},

	methods: {
		ultimasPublicaciones() {
			// Si no ha iniciado sesion, solo buscamos las ultimas publicaciones
			if (this.isLogged) {
				userHomeTimeline(
					this.firstPost,
					this.lastPost,
					this.$store.state.usuario.token
				)
					.then(res => {
						console.log(res.data);

						// Agregamos las publicaciones a la variable
						if (res.data.length !== 0) {
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
						} else {
							// Cuando ya no hay mas publicaciones
							if(this.publicaciones.length !== 0) { 
								this.dialog.message ="No existen mas publicaciones por los momentos.";
								this.dialog.color = "blue";
								this.dialog.isOpen = true;
							}
						}

						this.firstPost += 2;
						this.lastPost += 2;
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				// Si inicio session, mostramos las publicaciones de sus amigos y categorias que sigue
				guestGetTimeline(
					this.firstPost,
					this.lastPost
				)
					.then(res => {
						console.log(res.data);

						// Agregamos las publicaciones a la variable
						if (res.data.length !== 0) {
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
						} else {
							// Cuando ya no hay mas publicaciones
							this.dialog.message =
								"No existen mas publicaciones por los momentos.";
							this.dialog.color = "blue";
							this.dialog.isOpen = true;
						}

						this.firstPost += 2;
						this.lastPost += 2;
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	},
	created: function() {
		this.ultimasPublicaciones();
	},
	filters: {
		capitalize: function(value) {
			if (!value) return "";
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	}
};
</script>


