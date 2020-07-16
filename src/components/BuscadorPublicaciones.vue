<template>

    <v-container>

        <center><p class="title" style="color:#828282" v-show="resultados.length !== 0">Resultados de busqueda</p></center>

		<!-- Mensaje de 0 resultados -->
		<v-container v-show="resultados.length === 0">
			<v-row class="justify-center">
				<v-icon size=150>mdi-emoticon-sad-outline</v-icon>
			</v-row>
			<v-row class="justify-center">
				<p class="title text-center" style="color:#828282">No se han encontrado resultados para esta busqueda.</p>
			</v-row>	
		</v-container>
		
		

        <!-- Comienzo de publicaciones-->
		<ba-publicacion v-for="pub in resultados" :key="pub._id" :pub="pub" :showImage="pub.show_image"></ba-publicacion>
        <!-- Fin publicaciones -->

		<!-- Ver mas resultados -->
		<v-btn block color="primary" @click="buscar()" v-show="resultados.length !== 0">Ver mas resultados...</v-btn>

		<!-- Notificaciones -->
		<v-snackbar v-model="dialog.isOpen" :color="dialog.color" :timeout="dialog.timeout"  top style="margin-top:55px">
			{{ dialog.message }}
			<v-btn dark text @click="dialog.isOpen = false">Close</v-btn>
		</v-snackbar>


    </v-container>
  
</template>

<script>

import { buscarPublicacion } from '../services/sPublicacion'
import Publicacion from '../components/Publicacion.vue'
import { getImagenesPub } from '../services/sImagenes'
/* FALTA POR HACER

- colocar loader

*/


export default {
    name: 'BuscadorPublicaciones',
    data() {
        return {
			resultados: [],
			inicio: 0,
			final: 5,
			dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			}
        }
	},
	
	components: {
		BaPublicacion: Publicacion
	},

    computed: {

        queryBusqueda() {
			// Al buscar un nuevo termino, eliminamos la informacion anterior
            return this.$store.state.buscarPublicacion.query
        }

	},
	
	methods: {

		buscar: function() {
			buscarPublicacion(this.queryBusqueda, this.inicio, this.final).then( res => {

				if(res.data.length !== 0) {
					res.data.forEach(pub => {
						var pos = this.resultados.push(pub);
								// Buscamos las imagenes de cada publicacion
								getImagenesPub(pub._id)
									.then(res => {
										this.resultados[pos - 1].imagenes = res.data;
										if (res.data.length === 0) {
											this.resultados[pos - 1].show_image = false;
										} else {
											this.resultados[pos - 1].show_image = true;
										}
										// Volveamos a setear la publicacion para activar la reactividad
										this.$set(
											this.resultados,
											pos - 1,
											this.resultados[pos - 1]
										);
									})
									.catch(error => console.log(error));
					});
					this.inicio+=5
					this.final+=5
				} else {
					// Si no hay mas resultados, mostramos error
						this.dialog.message = "No hay mas resultados de busqueda."
						this.dialog.color = "blue"
						this.dialog.isOpen = true
				}
			}).catch( error => {
					this.dialog.message = "Ah ocurrido un error. Revise su conexion e intentelo nuevamente"
					this.dialog.color = "red"
					this.dialog.isOpen = true
       		})
		}
	},

    created: function() {
		this.inicio= 0 
			this.final = 5
			this.resultados = []
            this.buscar()
    },

    filters: {
          capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
          }
    },

    watch: {
        queryBusqueda: function() {
			this.inicio= 0 
			this.final = 5
			this.resultados = []
            this.buscar()
        }

    }
}
</script>

<style>

</style>