<template>
	<v-container fluid fill-height>
		<v-layout justify-center>
			<v-flex xs12 sm8 md4>
				<!-- Datos del perfil -->
				<v-card class="elevation-4 mb-6">
					<v-layout>
						<div style="width:120px; height:120px">
							<v-avatar size="120" tile>
								<img :src="$serverURL + usuario.profile_image" />
							</v-avatar>
						</div>
						<v-flex>
							<span class="title ml-3">{{ usuario.nombre }} {{ usuario.apellido }}</span>
							<br />
							<span
								class="subtitle-1 ml-3"
								style="color:gray"
							>{{usuario.id_estado.nombre}} - {{usuario.ciudad}}</span>
							<v-divider></v-divider>
							<v-card-actions>
								<v-btn icon small>
									<v-icon :color="color" @click="verificarIcon()">{{icon}}</v-icon>
								</v-btn>
								<v-btn icon small :to="{name:'ListaAmigos',params:{idUsuario:usuario._id}}">
									<v-icon>mdi-account-group</v-icon>
								</v-btn>
							</v-card-actions>
						</v-flex>
					</v-layout>
				</v-card>

				<!-- Ultimas publicaciones -->
				<center>
					<h3>
						<span style="color:gray">Ultimas publicaciones</span>
					</h3>
				</center>

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

				<!-- Mensaje Modal -->
				<v-dialog v-model="modalMensaje" max-width="250">
					<v-card>
						<v-card-title class="headline">¿Desea eliminar de su lista de amigos?</v-card-title>
						<v-card-text>
							<v-layout align-center justify-center>
								<p>
									<v-icon size="80" color="red">mdi-account-alert</v-icon>
								</p>
							</v-layout>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green darken-1" text @click="eliminarAmigo()">Si</v-btn>
							<v-btn color="red darken-1" text @click="modalMensaje=false">No</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<!-- Mensaje Modal 2 -->
				<v-dialog v-model="modalMensaje2" max-width="250">
					<v-card>
						<v-card-title class="headline">¿Desea agregarlo a su lista de amigos?</v-card-title>
						<v-card-text>
							<v-layout align-center justify-center>
								<p>
									<v-icon size="80" color="green">mdi-account-plus</v-icon>
								</p>
							</v-layout>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green darken-1" text @click="agregarAmigo()">Si</v-btn>
							<v-btn color="red darken-1" text @click="modalMensaje2=false">No</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

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
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
// Servicios
import { getUsuario, getAmigosUsuario } from "../services/sUsuario";
import { eliminarAmistad } from "../services/sAmigo";
import { enviarSolicitud } from "../services/sSolicitud";
import { consultarSolicitudes2 } from "../services/sSolicitudes";
import { getPublicacionesUser } from "../services/sPublicacion";
import { getImagenesPub } from "../services/sImagenes";

// Componentes
import Publicacion from "./Publicacion.vue";

export default {
	props: {
		source: String
	},
	data: () => ({
		publicaciones: [],
		imagenes: [],
		from: 0,
		to: 3,
		usuario: "",
		amigos: "",
		solicitud:"",
		verificar: false,
		icon: "",
		color: "",
		modalMensaje: false,
		modalMensaje2: false,
		dialog: {
			isOpen: false,
			color: "red",
			timeout: 3000,
			message: "",
			top: false
		}
	}),
	components: {
		BaPublicacion: Publicacion
	},
	props: ["idUsuario"],
	methods: {
		//Elimina la amistad entre los usuarios
		eliminarAmigo() {
			if (this.icon == "mdi-account-remove") {
				eliminarAmistad(this.$store.state.usuario.token, this.idUsuario)
					.then(res => {
						this.modalMensaje = false;
						this.dialog.message="Amistad Eliminada con Exito";
						this.dialog.color= "green";
						this.dialog.isOpen=true;
						this.icon = "mdi-account-plus";
						this.color="green"
						console.log(res.data);
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		//envia la solicitud de amistad
		agregarAmigo() {
			if (this.icon == "mdi-account-plus") {
				enviarSolicitud(this.idUsuario, this.$store.state.usuario.token)
					.then(res => {
						this.modalMensaje2 = false;
						this.dialog.message="Solicitud de Amistad Enviada";
						this.dialog.color= "green";
						this.dialog.isOpen=true;
						this.icon = "mdi-account-clock";
						this.color="blue"
						console.log(res.data);
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		//Verificamos que icono se encuentra en la casilla
		verificarIcon() {
			if (this.icon == "mdi-account-remove") {
				this.modalMensaje = true;
			}
			if(this.icon == "mdi-account-plus") {
				this.modalMensaje2 = true;
			} 
			if(this.icon == "mdi-account-clock"){
				this.dialog.color="red";
				this.dialog.message="Ya Tienes Una Solicitud pendiente";
				this.dialog.isOpen=true;
				
			}
		},

		ultimasPublicaciones: function() {
			getPublicacionesUser(this.idUsuario, this.from, this.to)
				.then(res => {
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
					if (this.publicaciones.length !== 0 && res.data.length === 0) {
						this.dialog.message =
							"No existen mas publicaciones por los momentos.";
						this.dialog.color = "blue";
						this.dialog.isOpen = true;
					}
					this.from += 3;
					this.to += 3;
				})
				.catch(error => {
					console.log(error);
				});
		}
	},

	created: function() {
		//Verificamos si el perfil es del usurario, si es el user lo enviamos al perfil principal
		if(this.idUsuario==this.$store.state.usuario.id){
				location.href="/#/perfil"
		}
		// Cargamos los datos Usuario
		getUsuario(this.idUsuario)
			.then(res => {
				this.usuario = res.data;
				console.log(res.data);
			})
			.catch(error => {
				console.log(error);
			}),
			//Buscamos las solicitudes de ese usurario
		consultarSolicitudes2(this.$store.state.usuario.id , this.idUsuario )
				.then(res => {
				this.solicitud=res.data;
				this.solicitud.forEach( sol => {
					this.verificar= false
						if(sol.status==0)
						{
							this.icon="mdi-account-clock";
							this.color="blue";
							this.verificar= true;
						}else{
					
							this.verificar= false;
						}
				});
				})
				.catch(error => { console.log(error); }),
			// Cargamos los amigos del Usuario
			getAmigosUsuario(this.idUsuario, this.$store.state.usuario.token)
				.then(res => {
					this.amigos = res.data;
					//verificamos que no haya solicitudes
					if(this.verificar==false){
							this.icon = "mdi-account-plus";
							this.color = "green";
					};

					this.amigos.forEach(amigo => {
						if (amigo._id == this.idUsuario) {
							this.icon = "mdi-account-remove";
							this.color = "red";
						}
					});
					console.log(res.data);
				})
				.catch(error => {
					console.log(error);
				}),
				

		
		// Cargamos las publicaciones
		this.ultimasPublicaciones();
	}
};
</script>