<template>
	<v-app id="inspire">
		<v-content>
			<v-container fluid fill-height>
				<v-layout align-center justify-center>
					<v-flex xs12 sm8 md4>
						<v-card class="elevation-12 ml-3 mr-3">
							<v-toolbar color="primary" dark flat>
								<v-spacer></v-spacer>
								<v-toolbar-title>Unirse a Bazar</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-tooltip right>
									<template v-slot:activator="{ on }">
										<v-btn icon large href="./#/" v-on="on">
											<v-icon>mdi-reply</v-icon>
										</v-btn>
									</template>
									<span>Volver</span>
								</v-tooltip>
							</v-toolbar>
							<v-card-text>

								<!-- Inicio Formulario -->
								<v-form ref="form">
									<v-layout justify-center mt-3>
										<v-avatar size="100" class="mb-4">
											<img src="../assets/profile.png" />
										</v-avatar>
									</v-layout>
									<v-flex xs12 sm12>
										<v-text-field
											v-model="usuario.nombre"
											:rules="[rules.required]"
											label="Nombre"
											outlined
											clearable
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm12>
										<v-text-field
											v-model="usuario.apellido"
											:rules="[rules.required]"
											label="Apellido"
											outlined
											clearable
										></v-text-field>
									</v-flex>
									<v-card-actions>
										<v-flex xs3 sm2 class="mr-3">
											<v-select v-model="usuario.cedulaPrefijo" :items="items" label="V-E " outlined></v-select>
										</v-flex>
										<v-spacer></v-spacer>
										<v-flex xs9 sm10>
											<v-text-field
												v-model="usuario.cedula"
												:rules="[rules.required]"
												label="Cedula"
												counter="10"
												outlined
												clearable
											></v-text-field>
										</v-flex>
									</v-card-actions>
									<v-menu
										ref="menu"
										v-model="menu"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										min-width="290px"
									>
										<template v-slot:activator="{ on }">
											<v-text-field
												v-model="usuario.fechaNac"
												label="Fecha de Nacimiento"
												prepend-icon="mdi-calendar"
												outlined
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
											ref="picker"
											v-model="usuario.fechaNac"
											:max="new Date().toISOString().substr(0, 10)"
											min="1950-01-01"
											@change="save"
										></v-date-picker>
									</v-menu>
									<v-flex xs12 sm12>
										<v-select v-model="usuario.estado" item-text="nombre" item-value="_id" :items="localidades" label="Localidad" outlined></v-select>
									</v-flex>
									<v-flex xs12 sm12>
										<v-text-field
											v-model="usuario.ciudad"
											:rules="[rules.required]"
											label="Ciudad"
											outlined
											clearable
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm12>
										<v-text-field
											v-model="usuario.correo"
											:rules="[rules.required]"
											label="Correo"
											outlined
											clearable
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm12>
										<v-text-field
											v-model="usuario.password"
											:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
											:rules="[rules.required, rules.min]"
											:type="show1 ? 'text' : 'password'"
											name="input-10-1"
											label="Contraseña"
											hint="Debe tener mas de 8 caracteres"
											counter
											outlined
											clearable
											@click:append="show1 = !show1"
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm12>
										<v-text-field
											id="confirmarC"
											v-model="usuario.confirmPassword"
											:rules="[rules.required, rules.min]"
											label="Confirmar Contraseña"
											name="confirmarC"
											type="password"
											outlined
											clearable
										></v-text-field>
									</v-flex>

									<!-- Recapcha -->
									<v-layout v-show="false" align-center justify-center>
										<img src="../assets/rec.png" />
									</v-layout>

								</v-form>
								<!-- Fin Formulario -->

							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-spacer></v-spacer>
								<v-spacer></v-spacer>
								<v-btn block color="primary" @click="validar()" dark>Unirse</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
							<v-card-actions>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>

		<!-- Notificaciones -->
		<v-snackbar style="margin-top:55px" v-model="dialog.isOpen" :color="dialog.color" :timeout="dialog.timeout" :top="dialog.top">
			{{ dialog.message }}
			<v-btn dark text @click="dialog.isOpen = false">Cerrar</v-btn>
		</v-snackbar>
		<!-- Fin notificaciones -->

		<!-- Mensaje Modal -->
		<v-dialog
			v-model="modalMensaje"
			max-width="290"
    	>
			<v-card>
				<v-card-title class="headline">¡Usuario registrado con exito!</v-card-title>
				<v-card-text>
				<v-layout align-center justify-center>
					<p><v-icon size="100" color="green">mdi-checkbox-marked-circle-outline</v-icon></p>
				</v-layout>
				Su cuenta ha sido registrada con exito, ahora puede volver a la pantalla principal para iniciar sesion.
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text to="/">
					Ir al Inicio
				</v-btn>
				</v-card-actions>
			</v-card>
    	</v-dialog>
		<!-- Fin mensaje modal-->

		<!-- Loader -->
		<div class="loader" v-show="isLoading">
      		<v-progress-circular
				indeterminate 
				color="purple"
				size="60"
				>
			</v-progress-circular>
		</div>
		<!-- Fin Loader -->
	</v-app>
</template>


<script>

import { registrarUsuario } from "../services/sUsuario"
import { getAllEstados } from "../services/sEstados"

export default {
	name: 'Registrar',
	data() {
		return {
			usuario: {
				nombre: "",
				apellido: "",
				cedula: "",
				fechaNac: null,
				cedulaPrefijo: "",
				estado: "",
				ciudad: "",
				correo: "",
				password: "",
				confirmPassword: ""
			},
			dialog: {
				isOpen: false,
				color: "red",
				timeout: 3000,
       			message: "",
        		top: false
			},
			modalMensaje: false,
			menu: false,
			show1: false,
			isLoading: false,
			items: ["V-", "E-"],
			localidades: [],
			watch: {
				menu(val) {
					val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
				}
			},
			rules: {
				required: value => !!value || "Campo Requerido.",
				min: v => v.length >= 8 || "Min 8 caracteres"
			}
		};
	},
	
	methods: {

		// Guarda la fecha seleccionada
		save (date) {
        this.$refs.menu.save(date)
      },

		// Valida todo los campos del formulario
		validar() {
			if(this.$refs.form.validate()) {
				this.registrar()
			} else {
				this.dialog.message = "Debe rellenar todos los campos para continuar";
          		(this.dialog.color = "red"), (this.dialog.isOpen = true);
          		this.dialog.top = true
			}
		},

		registrar() {
			this.isLoading = true
			registrarUsuario(this.usuario)
				.then(res => {
					console.log(res);
					this.modalMensaje = true
					this.isLoading = false
				})
				.catch(error => {

					// Manejamos error de red
					if(typeof error.response === 'undefined') {
						this.dialog.message = "Un error ha ocurrido. Compruebe su conexion a internet";
						(this.dialog.color = "red"), (this.dialog.isOpen = true);
						this.dialog.top = true
						this.isLoading = false
						console.log(JSON.stringify(error));
						return 0
					}

					// Manejamos error si el correo ya existe
					if(!(typeof error.response.data.code === 'undefined')) {
						if(error.response.data.code == "UserAlreadyExists") {
							this.dialog.message = error.response.data.message;
							(this.dialog.color = "red"), (this.dialog.isOpen = true);
							this.dialog.top = true
							this.isLoading = false
							console.log(JSON.stringify(error.response));
							return 0
						}
					}

					// Error Generico
					this.dialog.message = "Un error ha ocurrido";
					(this.dialog.color = "red"), (this.dialog.isOpen = true);
					console.log(JSON.stringify(error.response));

					})
		}
	},
	created: function() {

		// Cargamos los estados
		getAllEstados().then( res => {
			this.localidades = res.data
			console.log(res.data)
		}).catch( error => {
			console.log(error)
		})
	}
};
</script>

<style scoped>
.loader {
	position: fixed;
	top: 45%;
	left: 42%;
}
</style>