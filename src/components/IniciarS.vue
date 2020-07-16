<template>
	<v-content>
		<v-container fluid fill-height>
			<v-layout justify-center>
				<v-flex xs12 sm8 md4>
					<v-card class="elevation-12 ml-3 mr-3">
						<v-card-text>
							<v-flex xs12 sm12 md12>
								<center>
									<img src="../assets/bazar-logo.png" alt />
								</center>
							</v-flex>
							<v-form>
								<v-text-field label="Usuario o email" name="login" prepend-icon="mdi-account" type="text" v-model="correo"></v-text-field>

								<v-text-field
									id="password"
									label="Contraseña"
									name="password"
									prepend-icon="mdi-lock"
									type="password"
									v-model="password"
								></v-text-field>
							</v-form>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>

							<router-link to="/registro">
								<h5>Registrate</h5>
							</router-link>
							<v-spacer></v-spacer>
							<router-link to="/reestablecerC">
								<h6>¿Has olvidado tu contraseña?</h6>
							</router-link>
							<v-spacer></v-spacer>
							<v-btn color="primary" @click="iniciarSesion()">Iniciar</v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<!-- Notificaciones -->
		<v-snackbar v-model="dialog.isOpen" :color="dialog.color" :timeout="dialog.timeout" top style="margin-top:55px">
			{{ dialog.message }}
			<v-btn dark text @click="dialog.isOpen = false">Close</v-btn>
		</v-snackbar>
		<!-- Fin Notificaciones -->
		
	</v-content>
</template>

<script>

import { login } from '../services/sUsuario'

export default {
	name: 'IniciarSesion',
	data: () => ({
		drawer: null,
		dialog: {
			isOpen: false,
			color: "red",
			timeout: 3000,
			message: ""
		},
		correo: '',
		password: ''
	}),
	
	methods: {

		validarCampos() {
			if(this.password === '' || this.correo === '') {
				this.dialog.message = "Debe introducir su correo y contraseña"
				this.dialog.isOpen = true
				return false
			} else {
				return true
			}
		},

		iniciarSesion: function() {

			if(this.validarCampos()) {
				login(this.correo, this.password)
					.then( res => {
						// Guardamos informacion del usuario en el localStorage
						localStorage.userToken = res.data.token
						localStorage.userNombre = res.data.usuario.nombre
						localStorage.userApellido = res.data.usuario.apellido
						localStorage.userCorreo = res.data.usuario.email
						localStorage.userId = res.data.usuario._id
						localStorage.userTipo =res.data.usuario.tipo
						localStorage.userAvatar =res.data.usuario.profile_image
						// Cambiamos el estado en el Store Vuex
						this.$store.commit('iniciarSesion')
						// Redirigimos a pantalla de inicio
						this.$router.push('timeline')
					})
					.catch( error => {
						// Error de red
						if(typeof error.response === 'undefined') {
							// Mostramos mensaje de error
							this.dialog.message = "Un error ha ocurrido. Verifica tu conexion a internet"
							this.dialog.isOpen = true
							return 0
						}
						// Otros tipos de errores
						this.dialog.message = error.response.data.message
						this.dialog.isOpen = true
					})
				}
			}
		}
};
</script>