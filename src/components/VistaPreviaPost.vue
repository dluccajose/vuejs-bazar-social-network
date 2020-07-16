<template>
	<!-- Container principal -->
	<v-container>
		<v-layout justify-center mx-2>
			<!-- Carta de previsualizacion -->
			<v-card width="500px" :loading="isLoading">
				<v-card-title>
					<span style="color:gray">Vista Previa</span>
				</v-card-title>
				<v-divider></v-divider>
				<v-layout my-2 align-center>
					<v-row class="my-2" align-center justify-start no-gutters>
						<v-col cols="2" align-self="center">
							<v-avatar class="ml-3" size="45">
								<img src="../assets/perfil-prueba.jpg" />
							</v-avatar>
						</v-col>
						<v-col cols="10" class="pl-4">
							<v-row no-gutters>
								<v-col cols="6">
									<span class="caption">Nombre Apellido</span>
								</v-col>
								<v-spacer></v-spacer>
								<v-col>
									<span class="caption" style="color:gray">Producto</span>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col>
									<span class="body-2">{{ post.titulo }}</span>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-layout>
				<v-divider></v-divider>
				<v-carousel v-if="post.imagenes.length !== 0" height="150px" hide-delimiters>
					<v-carousel-item
						v-for="(item,i) in items"
						:key="i"
						:src="item.src"
						reverse-transition="fade-transition"
						transition="fade-transition"
					></v-carousel-item>
				</v-carousel>
				<v-divider v-if="post.imagenes.length !== 0"></v-divider>
				<v-card-text>
					<div style="white-space: pre-line">{{ post.descripcion}}</div>
				</v-card-text>
				<v-divider></v-divider>

				<!-- Acciones de la carta -->
				<v-card-actions>
					<v-flex row mx-2>
						<v-btn color="warning" height="40px" :to="{name: 'PublicarPostInfo', params: { tipoP, postPrev: post }}">VOLVER</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="success" height="40px" @click="PublicarPost">PUBLICAR</v-btn>
					</v-flex>
				</v-card-actions>
			</v-card>
		</v-layout>

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
		<!-- Fin Notificaciones -->


        <!-- Mensaje Modal -->
		<v-dialog
			v-model="modalMensaje"
			max-width="290"
    	>
			<v-card>
				<v-card-title class="headline">¡Publicacion creada con exito!</v-card-title>
				<v-card-text>
				<v-layout align-center justify-center>
					<p><v-icon size="100" color="green">mdi-checkbox-marked-circle-outline</v-icon></p>
				</v-layout>
				Su publicacion ha sido creada con exito.
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text to="/">
					Ir al Inicio
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->

	</v-container>
</template>

<script>

import { setTimeout } from "timers";
import { crearPublicacion } from "../services/sPublicacion";
import { subirImagenMulti } from '../services/sImagenes';




export default {
	name: "VistaPreviaPost",
	data() {
		return {
			items: [],
			isLoading: false,
			dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
            },
            modalMensaje: false
		};
	},

	props: ["post", "tipoP"],

	methods: {
		Cargando: function() {
			this.isLoading = true;
			setTimeout(() => {
				this.isLoading = false;
				console.log("ejecutado2");
			}, 4000);
		},

		PublicarPost: function() {

			crearPublicacion(this.post, this.tipoP, this.$store.state.usuario.token)
				.then(res => {
					// Si la publicacion contiene imagenes, las subimos al servidor
					if(this.post.imagenes.length !== 0) {
						subirImagenMulti(res.data.pub._id, this.post.imagenes, this.$store.state.usuario.token)
							.then( res => {
								this.modalMensaje = true
							})
							.catch( error => {
								this.dialog.isOpen = true,
								this.dialog.message = "Un error ha ocurrido. Intente nuevamente"
								console.log(error)
							})
					} else {
						// Si no tiene imagenes, solo mostramos el mensaje de exito
						this.modalMensaje = true
					}
				})
				.catch(error => {
                    this.dialog.isOpen = true,
                    this.dialog.message = "Un error ha ocurrido. Intente nuevamente"
                    console.log(error)
				});
		},

		PrevisualizarImagen: function() {
	
			this.post.imagenes.forEach(element => {
				
				// Creamos un FileReader por cada imagen
				var fr = new FileReader()
				// Self para poder usar This dentro del eventListenerss
				const self = this
				// Escuchamos por el evento Load que dispara la funcion readAsDataURL cuando termina de leer la imagen
				fr.addEventListener("load", function () {
					// Agregamos la URL de la imagen al array de Imagenes que se muestran en pantalla
					self.items.push({ src: fr.result})
				}, false)

				// Leemos la informacion de cada imagen y la convertimos a URL
				fr.readAsDataURL(element)
			});

		}
	},

	created() {
		
		this.PrevisualizarImagen()
	}
};
</script>
