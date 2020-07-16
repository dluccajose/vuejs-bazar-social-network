<template>
	<v-container>
		<v-row col-12>
			<v-card color="#5837ba" dark class="mx-3">
				<v-card-title class="headline">Crear categorias</v-card-title>
				<div class="mx-3">
					<span style="color:#99c4d5">Crea una nueva categoria de tipo producto, servicio o social.</span>
				</div>
				<v-card-actions style="margin-top:10px">
					<v-btn to="/adminPanel/categorias/crear" text>Crear nueva categoria</v-btn>
				</v-card-actions>
			</v-card>
		</v-row>

		<v-row col-12>
			<v-card color="#5837ba" dark class="mx-3 mt-3 pt-3 pb-5" width="100%">
				<v-card-title class="headline">Productos</v-card-title>
				<v-row dense v-for="(cat, index) in categoriasP" :key="cat._id" class="mx-3">
					<v-col class="pt-3">
						<span>{{ cat.nombre }}</span>
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="4">
						<v-btn icon x-small class="mr-3" :to="{ name: 'EditarCategoria', params: { id: cat._id}}">
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn icon x-small @click="eliminar(cat._id, index, cat.tipo)">
							<v-icon>mdi-trash-can-outline</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-row>

		<v-row col-12>
			<v-card color="#5837ba" dark class="mx-3 mt-3 pt-3 pb-5" width="100%">
				<v-card-title class="headline">Servicios</v-card-title>
				<v-row dense v-for="(cat, index) in categoriasSE" :key="cat._id" class="mx-3">
					<v-col class>
						<span>{{ cat.nombre }}</span>
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="4">
						<v-btn icon x-small class="mr-3">
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn icon x-small @click="eliminar(cat._id, index, cat.tipo)">
							<v-icon>mdi-trash-can-outline</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-row>

		<v-row col-12>
			<v-card color="#5837ba" dark class="mx-3 mt-3 pt-3 pb-5" width="100%">
				<v-card-title class="headline">Social</v-card-title>
				<v-row dense v-for="(cat, index) in categoriasSO" :key="cat._id" class="mx-3">
					<v-col class="pt-3">
						<span>{{ cat.nombre }}</span>
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="4">
						<v-btn icon small class="mr-3">
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn icon small @click="eliminar(cat._id, index, cat.tipo)">
							<v-icon>mdi-trash-can-outline</v-icon>
						</v-btn>
					</v-col>
				</v-row>
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
	</v-container>
</template>

<script>
import {
	getAllCategorias,
	eliminarCategoria
} from "./../../services/sCategoria";

export default {
	data() {
		return {
			categoriasP: [],
			categoriasSE: [],
			categoriasSO: [],
			dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			}
		};
	},

	created() {
		getAllCategorias().then(res => {
			res.data.forEach(cat => {
				if (cat.tipo === 1) {
					this.categoriasP.push(cat);
				}
				if (cat.tipo === 2) {
					this.categoriasSE.push(cat);
				}
				if (cat.tipo === 3) {
					this.categoriasSO.push(cat);
				}
			});
		});
	},

	methods: {
		eliminar: function(idCat, index, tipo) {
			eliminarCategoria(idCat, this.$store.state.usuario.token)
				.then(res => {
					// Eliminamos el arreglo de la categoria
					switch (tipo) {
						case 1:
							this.categoriasP.splice(index, 1);
							break;
						case 2:
							this.categoriasSE.splice(index, 1);
							break;
						case 3:
							this.categoriasSO.splice(index, 1);
							break;
                    }
                    this.dialog.message =
								"Categoria eliminada.";
					 this.dialog.color = "green";
					 this.dialog.isOpen = true;
				})
				.catch(error => {
                    this.dialog.message =
								"No se pueden eliminar categorias que contienen publicaciones.";
					 this.dialog.color = "red";
					 this.dialog.isOpen = true;
                });
		}
	}
};
</script>

<style>
</style>