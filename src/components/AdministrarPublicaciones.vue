<template>
  <v-container>
      <v-card>
          <v-card-title>Publicaciones</v-card-title>
          <v-row>
              <v-col>
                <v-list>
                    <v-list-item v-for="pub in publicaciones" :key="pub.titulo" :class="{ 'desactivada': pub.is_active == 0}">
                        <v-list-item-title>
                            {{pub.titulo}}
                        </v-list-item-title>
                        <v-spacer></v-spacer>
                        <v-btn icon small class :to="{ name: 'EditarPublicacion', params: { idPublicacion: pub._id}}">
							<v-icon color="blue">mdi-pencil</v-icon>
						</v-btn>
                        <v-btn icon small v-show="pub.is_active == 1" @click="modalMensaje2.isOpen = true; idDesactivar = pub._id">
							<v-icon color="warning">mdi-book-remove-multiple</v-icon>
						</v-btn>
                        <v-btn icon small v-show="pub.is_active == 0" @click="modalMensaje3.isOpen = true; idActivar = pub._id">
							<v-icon color="green">mdi-book-plus-multiple</v-icon>
						</v-btn>
                        <v-btn icon small @click="modalMensaje1.isOpen = true; idEliminar = pub._id">
                            <v-icon color="red">mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-list-item>
                </v-list>
              </v-col>
          </v-row>
      </v-card>

      <!-- Mensaje Modal Confirmacion Eliminar -->
		<v-dialog
			v-model="modalMensaje1.isOpen"
			max-width="310"
    	>
			<v-card>
				<v-card-title class="headline">¿Desea eliminar esta publicacion?</v-card-title>
				<v-card-text>
				Una vez que realice esta accion la publicacion sera eliminada y no podra acceder a ella en el futuro.
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="eliminarPublicacion(idEliminar)">
                            Eliminar
                        </v-btn>
                <v-btn color="grey darken-1" text @click="modalMensaje1.isOpen = false" >
					Cancelar
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->

        <!-- Mensaje Modal Confirmacion Desactivar -->
		<v-dialog
			v-model="modalMensaje2.isOpen"
			max-width="310"
    	>
			<v-card>
				<v-card-title class="headline">¿Desea desactivar esta publicacion?</v-card-title>
				<v-card-text>
				Al desactivar la publicacion dejara de ser visible para los usuarios. Puedes activarla nuevamente cualquier momento del futuro.
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="warning darken-1" text @click="desactivarPublicacion(idDesactivar)">
					Desactivar
				</v-btn>
                <v-btn color="grey darken-1" text @click="modalMensaje2.isOpen = false" >
					Cancelar
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->


        <!-- Mensaje Modal Confirmacion Activar -->
		<v-dialog
			v-model="modalMensaje3.isOpen"
			max-width="310"
    	>
			<v-card>
				<v-card-title class="headline">¿Desea activar esta publicacion?</v-card-title>
				<v-card-text>
				Al actviarla, la publicacion estara disponible para todos los usuarios.
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="activarPublicacion(idActivar)">
					Activar
				</v-btn>
                <v-btn color="grey darken-1" text @click="modalMensaje3.isOpen = false" >
					Cancelar
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->

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

  </v-container>
</template>

<script>

import { getPublicacionesUserAll, eliminarPublicacion, desactivarPublicacion, activarPublicacion } from "../services/sPublicacion";
import { eliminarCategoria } from '../services/sCategoria';


export default {

    data() {
        return {
            publicaciones: [],
            from: 0,
            to: 10,
            modalMensaje1: {
                isOpen: false,
                titulo: '',
                contenido: ''
            },
            modalMensaje2: {
                isOpen: false,
                titulo: '',
                contenido: ''
            },
            modalMensaje3: {
                isOpen: false,
                titulo: '',
                contenido: ''
            },            
            idEliminar: '',
            idDesactivar: '',
            idActivar: '',
			dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			},            
        }
    },

    methods: {

        ultimasPublicaciones: function() {
			getPublicacionesUserAll(this.$store.state.usuario.id, this.from, this.to)
				.then(res => {
					res.data.forEach(pub => {
						this.publicaciones.push(pub);
                            })
                    this.from += 3;
					this.to += 3;
					})
				.catch(error => {
					console.log(error);
				});
        },

        eliminarPublicacion: function(idPub) {
            eliminarPublicacion(idPub, this.$store.state.usuario.token)
                .then( res => {
                    
                    // Eliminamos la categoria del array
                    var indexPub = this.publicaciones.findIndex( pub => pub._id == this.idEliminar)
                    this.publicaciones.splice(indexPub, 1)
                    
                    // Mensaje de confirmacion
                    this.modalMensaje1.isOpen = false
                    this.dialog.isOpen = true
                    this.dialog.message = "Publicacion eliminada con exito."
                    this.dialog.color = "green"
                    this.idEliminar = ''
                })
                .catch( error => {
                    this.dialog.isOpen = true
                    this.dialog.message = "Un error ha ocurrida, intentalo nuevamente."
                    this.dialog.color = "red"
                    this.idEliminar = ''
                })
        },

        desactivarPublicacion: function(idPub) {
            desactivarPublicacion(idPub, this.$store.state.usuario.token)
                .then( res => {
                    
                    // Actualizamos el estado en el array
                    var indexPub = this.publicaciones.findIndex( pub => pub._id == this.idDesactivar)
                    this.$set(this.publicaciones[indexPub], 'is_active', 0)
                    
                    // Mensaje de confirmacion
                    this.modalMensaje2.isOpen = false
                    this.dialog.isOpen = true
                    this.dialog.message = "Publicacion desactivada con exito."
                    this.dialog.color = "green"
                    this.idDesactivar = ''
                })
                .catch( error => {
                    this.dialog.isOpen = true
                    this.dialog.message = "Un error ha ocurrida, intentalo nuevamente."
                    this.dialog.color = "red"
                    this.idEliminar = ''
                })
        },

        activarPublicacion: function(idPub) {
            activarPublicacion(idPub, this.$store.state.usuario.token)
                .then( res => {
                    
                    // Actualizamos el estado en el array
                    var indexPub = this.publicaciones.findIndex( pub => pub._id == this.idActivar)
                    this.$set(this.publicaciones[indexPub], 'is_active', 1)
                    
                    // Mensaje de confirmacion
                    this.modalMensaje3.isOpen = false
                    this.dialog.isOpen = true
                    this.dialog.message = "Publicacion activada con exito."
                    this.dialog.color = "green"
                    this.idDesactivar = ''
                })
                .catch( error => {
                    this.dialog.isOpen = true
                    this.dialog.message = "Un error ha ocurrida, intentalo nuevamente."
                    this.dialog.color = "red"
                    this.idEliminar = ''
                })           
        }
    },

    created() {
        this.ultimasPublicaciones()
    }
}
</script>

<style>
.desactivada {
  background-color: #d8d8d8;
}
</style>