<template>
<!-- Contenedor principal -->
	<v-container>


		<!-- Mensaje de 0 resultados -->
		<v-container v-show="publicaciones.length === 0">
			<v-row class="justify-center">
				<v-icon size=150>mdi-emoticon-sad-outline</v-icon>
			</v-row>
			<v-row class="justify-center">
				<p class="title text-justify px-3" style="color:#828282">No existe ninguna publicacion para esta categoria.
				</p>
			</v-row>	
		</v-container>


		<!-- Publicacion -->
				<!-- Comienzo de publicaciones-->
		<ba-publicacion
			v-for="pub in publicaciones"
			:key="pub._id"
			:pub="pub"
			:showImage="pub.show_image"
		></ba-publicacion>
		<!-- Fin publicaciones -->


		<!-- Ver mas publicaciones -->
		<v-btn block color="primary" @click="cargarPublicaciones()">Ver mas...</v-btn> 

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
		<!-- Fin notificaciones -->

    </v-container>
</template>

<script>

import { publicacionesPorCategoria } from '../services/sCategoria'
import Publicacion from './Publicacion.vue'
import { getImagenesPub } from '../services/sImagenes'

export default {
    name: 'VerCategoria',
	data: () => ({
        publicaciones: [],
        from: 0,  // Parametros para la paginacion de las publicaciones
		to: 2,
		imagenes: [],
		dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			}
    }),
	props: [ 'idCategoria' ],
	
	components: {
		BaPublicacion: Publicacion
	},

	methods: {

		cargarPublicaciones: function() {
			// Cargar publicaciones de la categoria seleccionada
			publicacionesPorCategoria(this.idCategoria, this.from, this.to)
				.then( res => {
					if(res.data.length !== 0) {
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
						})
						this.from+= 2
						this.to+= 2
					} else {
							// Cuando ya no hay mas publicaciones
							if(this.publicaciones.length !== 0) {
								this.dialog.message =
									"No existen mas publicaciones por los momentos.";
								this.dialog.color = "blue";
								this.dialog.isOpen = true;
							}
					}
				})
				.catch( error => {
					console.log(error)
				})
		}
	},

    mounted: function() {

		// Cargar publicaciones al iniciar
		this.cargarPublicaciones()
        
    }

}
</script>

<style>

</style>