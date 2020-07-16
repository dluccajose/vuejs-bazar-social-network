<template>
	<v-container>
		<v-row col-12>
			<v-card class="mx-3" width="100%">
				<v-card-title class="headline">Crear categoria</v-card-title>
				<v-container class>
					<v-row no-gutters>
						<v-col>
							<v-text-field v-model="nombre" outlined label="Titulo de la categoria"></v-text-field>
						</v-col>
					</v-row>
					<v-row no-gutters>
						<v-col>
							<v-select
								v-model="tipo"
								item-text="text"
								item-value="value"
								label="Tipo de categoria"
								:items="items"
							></v-select>
						</v-col>
					</v-row>
				</v-container>
				<v-card-actions style="margin-top:10px">
					<v-btn @click="postCategoria()" text>Editar Categoria</v-btn>
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
			<v-btn dark text @click="dialog.isOpen = false">Close</v-btn>
		</v-snackbar>

		<!-- Mensaje Modal -->
		<v-dialog
			v-model="modalMensaje"
			max-width="290"
    	>
			<v-card>
				<v-card-title class="headline">¡Categoria editada!</v-card-title>
				<v-card-text>
				<v-layout align-center justify-center>
					<p><v-icon size="100" color="green">mdi-checkbox-marked-circle-outline</v-icon></p>
				</v-layout>
				La categoria ha sido editada y guardada en la base de datos.
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text to="/adminPanel/categorias">
					Ir a Categorias
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->

	</v-container>
</template>

<script>
import { getCategoria, editarCategoria } from "./../../services/sCategoria";

export default {
	data() {
		return {
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
	
	props: [ 'id' ],
    
    methods: {

        postCategoria: function() {
			if( this.nombre === '' || this.tipo === "") {
				this.dialog.message =
								"Debes llenar todos los campos.";
					 this.dialog.color = "red";
					 this.dialog.isOpen = true;
			} else { 
			editarCategoria(this.id, this.nombre, this.tipo, this.$store.state.usuario.token)
				.then( res => {
					console.log('editado')
					this.modalMensaje = true
				}).catch(error => {
					console.log(error)
				})
			}
		},

		getDatos() {
			getCategoria(this.id).then( res => {
				this.nombre = res.data.nombre,
				this.tipo = res.data.tipo
			}).catch( error => {
				console.log(error)
			})
		}
	},
	
	created() {

		//Cargamos datos de la categoria
		this.getDatos()
	}
};
</script>

<style>
</style>