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
							<v-textarea v-model="post.descripcion" outlined name="input-7-4" label="Descripcion"></v-textarea>
						</v-flex>
						<v-flex sm12 md12 xs12>
							<v-select
								v-model="post.categoria"
								item-text="nombre"
								item-value="_id"
								label="Categoria"
								:items="categorias"
							></v-select>
						</v-flex>
						<v-flex sm12 md12 xs12>
							<v-text-field v-if="!isSocial" v-model="post.precio" label="Precio"></v-text-field>
						</v-flex>
						<v-flex mb-3 sm12 md12 xs12>
							<center>
								<v-file-input 
								chips 
								multiple label="Subir imagenes"
								prepend-icon="mdi-camera"
								outlined
								accept="image/png, image/jpeg, image/bmp"
								v-model="post.imagenes"
								>
								</v-file-input>
							</center>
						</v-flex>
					</v-layout>
					<!-- Acciones de la carta -->
					<v-card-actions>
						<v-flex row mx-4 mb-3>
							<v-btn color="warning" height="40px" to="/nuevoPost">VOLVER</v-btn>
							<v-spacer></v-spacer>
							<v-btn
								color="secondary"
								height="40px"
                				@click="vistaPrevia()"
							>VISTA PREVIA</v-btn>
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

	</v-container>
</template>


<script>
import { getAllCategorias } from "../services/sCategoria";

export default {
	name: "PublicarPostInfo",

	data() {
		return {
			categorias: [],
			post: {
				titulo: "",
				descripcion: "",
				categoria: "",
				precio: "",
				imagenes: []
      },
      dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
				message: ""
			}
		};
	},
	props: ["tipoP", "postPrev"],

	computed: {

    // Devuelve true si la publicacion es de tipo Articulo
		isArticulo() {
			if (this.tipoP == "1") {
				return true;
			} else {
				return false;
			}
    },
    
    // Devuelve true si la publicacion es de tipo Servicio
		isServicio() {
			if (this.tipoP == "2") {
				return true;
			} else {
				return false;
			}
    },

    // Devuelve true si la publicacion es de tipo Social
		isSocial() {
			if (this.tipoP == "3") {
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
	    this.post.descripcion === '' || 
	    this.post.categoria === '') {
        return false
      } else {
        if(this.tipoP != '3') {
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
    vistaPrevia() {
      if(this.validarCampos()) {  
		this.$router.push({ name: 'VistaPreviaPost', params: { post: this.post, tipoP: this.tipoP}})
      } else {
		// Mensaje de error
        this.dialog.isOpen = true
        this.dialog.message = "Debe completar todos los campos"
      }
    }

  },

	created: function() {
		// Cargar Categorias
		getAllCategorias().then(res => {
			res.data.forEach(cat => {
				if(cat.tipo === this.tipoP) {
					this.categorias.push(cat)	
				}
			});
		})

		// Cargar datos de la publicacion cuando venimos de la pantalla "Vista Previa"
		if( typeof this.postPrev !== 'undefined') {
			this.post = this.postPrev
		}
	},

	watch: {
		
		// Si el tipo de publicacion cambia, volvemos a cargar las categorias
		tipoP: function() {
			this.categorias = []
			getAllCategorias().then(res => {
				res.data.forEach(cat => {
					if(cat.tipo === this.tipoP) {
						this.categorias.push(cat)	
					}
				})
			})
		}
	}
};
</script>
