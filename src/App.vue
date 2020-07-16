<template>

	<v-app>
		<!-- Barra Top -->
		<v-app-bar color="primary" app fixed extension-height="80">
			<v-app-bar-nav-icon color="white" @click="drawer =! drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>
				<span style="color:white">Bazar</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon dark v-show="!isLogginPage">
				<v-icon @click="abrirBuscador()">mdi-magnify</v-icon>
			</v-btn>
			<v-btn icon dark v-show="isLogged">
				<v-icon>mdi-bell</v-icon>
			</v-btn>

      <!-- Buscador -->
			<template v-slot:extension v-if="buscador"> 
					<v-text-field 
            			class="mt-3"
						background-color="#7e5aec"
						color="white"
						solo
            			dark
						dense
						flat
            			placeholder="Buscar publicacion...."
						prepend-inner-icon="mdi-magnify"
						@keyup.enter.native="buscar"
						v-model="query"
					></v-text-field>
			</template>
      <!-- Fin Buscador -->

		</v-app-bar>
    <!-- Fin navbar -->

		<!-- Contenido del Router -->
		<v-content>
			<!-- <keep-alive exclude="PublicarPostInfo"> -->
				<router-view></router-view>
			<!-- </keep-alive> -->
		</v-content>

		<!-- Nav Bottom -->
		<v-bottom-navigation v-if="isLogged" v-model="bottomNav" app grow>
			<v-btn value="inicio" to="/timeline">
				<span>Inicio</span>
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<v-btn value="categorias" to="/CategoriasSeguidas">
				<span>Categorias</span>
				<v-icon>mdi-book-multiple</v-icon>
			</v-btn>
			<v-btn value="mensajes" to="/Inbox">
				<span>Mensajes</span>
				<v-icon>mdi-forum</v-icon>
			</v-btn>
			<v-btn value="cuenta" to="/perfil">
				<span>Perfil</span>
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</v-bottom-navigation>


		<!-- Menu lateral Drawer -->
		<v-navigation-drawer v-model="drawer" app temporary>
			<!-- Foto de perfil -->
			<v-container>
				<v-layout justify-center mt-3>
					<v-avatar size="100">
						<img :src="$serverURL + userAvatar" alt v-if="isLogged" />
						<img src="./assets/profile.png" alt v-else />
					</v-avatar>
				</v-layout>
			</v-container>

			<!-- Lista del menu -->
			<v-list dense class="mt-2">
				<v-list-item to="/timeline" v-if="isLogged">
					<v-list-item-icon>
						<v-icon>mdi-home</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Inicio</v-list-item-content>
				</v-list-item>

				<v-list-item to="/timeline" v-if="!isLogged">
					<v-list-item-icon>
						<v-icon>mdi-home</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Entrar como Invitado</v-list-item-content>
				</v-list-item>

				<v-list-item to="/nuevoPost" v-if="isLogged">
					<v-list-item-icon>
						<v-icon>mdi-pen-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Publicar</v-list-item-content>
				</v-list-item>

				<v-list-item to="/Categorias">
					<v-list-item-icon>
						<v-icon>mdi-book-multiple</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Categorias</v-list-item-content>
				</v-list-item>

				<v-list-item v-if="isLogged" :to="{ name: 'ListaAmigos', params: { idUsuario: userId }}">
					<v-list-item-icon>
						<v-icon>mdi-account-group</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Amigos</v-list-item-content>
				</v-list-item>
				
				<v-list-item v-if="isLogged" to="/solicitudes">
                  <v-list-item-icon>
                    <v-icon>mdi-account-question</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Solicitudes
                  </v-list-item-content>
                </v-list-item>


				<v-list-item v-if="isLogged" to="/Busqueda">
                  <v-list-item-icon>
                    <v-icon>mdi-account-search</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                   Personas
                  </v-list-item-content>
                </v-list-item>                   
                   
				<v-list-item v-if="isAdmin" to="/adminPanel">
                  <v-list-item-icon>
                    <v-icon>mdi-account-tie</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Panel Administrador
                  </v-list-item-content>
                </v-list-item>


				<v-divider inset class="mt-5 mb-2"></v-divider>

				<v-list-item v-if="isLogged" to="/editarp">
					<v-list-item-icon>
						<v-icon>mdi-tune</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Configuracion</v-list-item-content>
				</v-list-item>

				<v-list-item v-if="!isLogged" to="/">
					<v-list-item-icon>
						<v-icon>mdi-account-circle</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Iniciar Sesion</v-list-item-content>
				</v-list-item>

				<v-list-item v-if="!isLogged" to="/registro">
					<v-list-item-icon>
						<v-icon>mdi-account-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Registrarse</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-icon>
						<v-icon>mdi-help-box</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Ayuda</v-list-item-content>
				</v-list-item>

				<v-list-item v-if="isLogged" @click="cerrarSesion()">
					<v-list-item-icon>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Cerrar Sesion</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-app>
</template>

<script>
export default {
	name: "AppBazar",
	data: () => ({
		bottomNav: "inicio",
    drawer: null,
	buscador: false,
	query: ''
	}),

	computed: {
		isLogged() {
			if (this.$store.state.usuario.token) {
				return true;
			} else {
				return false;
			}
		},

		isAdmin() {
			if (this.$store.state.usuario.tipo == 2) {
				return true;
			} else {
				return false;
			}
		},

		isLogginPage() {
			if( this.$route.path === '/') {
				return true
			} else {
				return false
			}
		},

		userAvatar() {
			return this.$store.state.usuario.avatar
		},

		userId() {
			return this.$store.state.usuario.id
		}
	},

	methods: {
		cerrarSesion() {
			// Eliminamos la informacion del localStore
			localStorage.userToken = "";
			localStorage.userNombre = "";
			localStorage.userApellido = "";
			localStorage.userCorreo = "";
			localStorage.userId = "";
			localStorage.userTipo = "";
			localStorage.userAvatar = "";
			// Cambiamos el estado del Store Vuex
			this.$store.commit("cerrarSesion");
			// Redirigimos a la pantalla de inicio
			this.$router.push("/");
		},

		abrirBuscador() {
			this.buscador = !this.buscador
		},

		buscar() {
			this.$store.commit("buscarPublicacion", this.query)
			this.$router.push('/publicaciones/buscar')
		}
	}
};
</script>
