<template>
	<v-container>
		<v-layout justify-center>
			<v-card min-width="300px" class="mx-1">
				<v-form>
					<v-layout row mx-4 my-2>
						<v-flex sm12 md12 xs12>
							<v-text-field v-model="post.titulo" label="Titulo" :value="post.titulo"></v-text-field>
						</v-flex>
						<v-flex sm12 md12 xs12>
							<v-textarea v-model="post.contenido" outlined name="input-7-4" label="Descripcion"></v-textarea>
						</v-flex>
						<v-flex sm12 md12 xs12>
							<v-select
								v-model="post.id_categoria._id"
								item-text="nombre"
								item-value="_id"
								label="Categoria"
								:items="categorias"
							></v-select>
						</v-flex>
						<v-flex sm12 md12 xs12>
							<v-text-field v-if="!isSocial" v-model="post.precio" label="Precio"></v-text-field>
						</v-flex>
					</v-layout>

					<!-- Acciones de la carta -->
					<v-card-actions>
						<v-flex row mx-4 mb-3>
							<v-btn color="warning" height="40px" 
							@click="$router.go(-1)">VOLVER</v-btn>
							<v-spacer></v-spacer>
							<v-btn
								color="secondary"
								height="40px"
                				@click="modificarPublicacion()"
							>Modificar</v-btn>
						</v-flex>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-layout>

    <!-- Notificaciones -->
		<v-snackbar v-model="dialog.isOpen" :color="dialog.color" :timeout="dialog.timeout"  top style="margin-top:55px">
			{{ dialog.message }}
			<v-btn dark text @click="dialog.isOpen = false">Close</v-btn>
		</v-snackbar>
    <!-- Fin Notificaciones -->


	<!-- Mensaje Modal -->
		<v-dialog
			v-model="modalMensaje"
			max-width="310"
    	>
			<v-card>
				<v-card-title class="headline">Publicacion modificada</v-card-title>
				<v-card-text>
				Los datos de la publicacion se han modificado con exito.
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="$router.push('/usuario/publicaciones')">
					Aceptar
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->
	</v-container>
</template>


<script>
import { getAllCategorias } from "../services/sCategoria";
import { getPublicacion, modificarPublicacion } from '../services/sPublicacion'

export default {
	name: "PublicarPostInfo",

	data() {
		return {
			categorias: [],
			post: {
				id_categoria: {
					_id: ''
				}
			},
      dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			},
		modalMensaje: false
		};
	},
	props: ["idPublicacion"],

	computed: {

    // Devuelve true si la publicacion es de tipo Articulo
		isArticulo() {
			if (this.post.tipo == "1") {
				return true;
			} else {
				return false;
			}
    },
    
    // Devuelve true si la publicacion es de tipo Servicio
		isServicio() {
			if (this.post.tipo  == "2") {
				return true;
			} else {
				return false;
			}
    },

    // Devuelve true si la publicacion es de tipo Social
		isSocial() {
			if (this.post.tipo == "3") {
				return true;
			} else {
				return false;
			}
		}
  },
  
  methods: {


    // Validacion de campos
    validarCampos() {
	  if(this.post.titulo === '' || 
	    this.post.contenido === '' || 
	    this.post.id_categoria._id === '') {
        return false
      } else {
        if(this.post.tipo != '3') {
          if(this.post.precio === '') {
            return false
          } else {
            return true
          }
        } else{
          return true
        }
      }
    },

    // ir a pantalla de vista previa
    modificarPublicacion() {
      if(this.validarCampos()) {  
		modificarPublicacion(this.idPublicacion, this.post, this.$store.state.usuario.token)
			.then( res => {
				// Mostramos mensaje de exito
				this.modalMensaje = true
			}).catch( error => {
				// Mostramos mensaje de error
				this.dialog.isOpen = true
				this.dialog.message = "Un error ha ocurrido. Intentelo nuevamente o verifique su conexion a internet"
				this.dialog.color = 'red'
			})
      } else {
		// Mensaje de error
        this.dialog.isOpen = true
        this.dialog.message = "Debe completar todos los campos"
      }
    }

  },

	created: function() {

		// Cargar informacion de la publicacion
		getPublicacion(this.idPublicacion).then( res => {
			this.post = res.data
			// Cargar Categorias
			getAllCategorias().then(res => {
				res.data.forEach(cat => {
					if(cat.tipo === this.post.tipo) {
						this.categorias.push(cat)	
					}
				});
			})
		})
	}
};
</script>
