<template>
	<v-container>
		<v-row col-12 >
			<v-card class="mx-3" width="100%" >
				<v-layout justify-center mt-3>
				<v-card-title class="headline" >Editar foto de Perfil</v-card-title>
					</v-layout>
				<v-container class>
			<v-layout justify-center mt-3>
                  <v-avatar size="150">
                    <img :src="$serverURL + usuario.profile_image"/>
                  </v-avatar>
				  
			</v-layout>
			<v-spacer></v-spacer>
			<v-layout justify-center mt-8>
					<v-row no-gutters justify-center mt-3>
						<v-col>
							<v-file-input
								chips
								label="Seleccionar Imagen"
								prepend-icon="mdi-camera"
								outlined
								v-model="imagen"
								accept="image/png, image/jpeg, image/bmp"
							></v-file-input>
						</v-col>
					</v-row>
				</v-layout>
				</v-container>
				<v-card-actions  style="margin-top:10px">
					<v-btn  @click="guardarImagen()" block color="primary">Cambiar Foto</v-btn>
				</v-card-actions>
			</v-card>
		</v-row>
		<!-- Notificaciones -->
		<v-snackbar
			v-model="dialog.isOpen"
			:color="dialog.color"
			:timeout="dialog.timeout"
			top
			style="margin-top:55px"
		>
			{{ dialog.message }}
			<v-btn dark text @click="dialog.isOpen = false"><v-icon color="grey">mdi-close</v-icon></v-btn>
		</v-snackbar>

		<!-- Mensaje Modal -->
		<v-dialog
			v-model="modalMensaje"
			max-width="290"
    	>
			<v-card>
				<v-card-title class="headline">¡Foto Actualizada!</v-card-title>
				<v-card-text>
				<v-layout align-center justify-center>
					<p><v-icon size="100" color="green">mdi-checkbox-marked-circle-outline</v-icon></p>
				</v-layout>
				Se ha cargado su foto correctamente
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text to="/perfil">
					Ir a Perfil
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->

	</v-container>
</template>

<script>
import { getUsuario, modificarFoto } from "../services/sUsuario";
import { subirImagenSingle } from "../services/sImagenes";

export default {
	data() {
		return {
			usuario: "",
			nombre: "",
			imagen: [],
			tipo: "",
			items: [
				{
					text: "Producto",
					value: 1
				},
				{
					text: "Servicio",
					value: 2
				},
				{
					text: "Social",
					value: 3
				}
			],
			dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			},
			modalMensaje: false
		};
    },
    
    methods: {

        guardarImagen: function() {
			if( this.imagen.length === 0) {
				this.dialog.message =
								"Debes subir una imagen.";
					 this.dialog.color = "red";
					 this.dialog.isOpen = true;
			} else { 
            subirImagenSingle(this.imagen, this.$store.state.usuario.token).then( res => {
                modificarFoto(res.data.file_path, this.$store.state.usuario.token).then( res => {
					console.log(res.data)
					this.modalMensaje = true
                }).catch( error => {
                    console.log(error)
                })
            }).catch( error => {
                    console.log(error)
				})
			}
		},
		

	},
		created: function() {
    	getUsuario(this.$store.state.usuario.id).then( res => {
      this.usuario = res.data
			console.log(res.data)
		}).catch( error => {
			console.log(error)
		})
	}
};
</script>

<style>
</style>