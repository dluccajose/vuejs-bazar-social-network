<template>
	<!-- Comienzo de publicaciones-->
	<v-layout justify-center mx-0 mt-1 mb-6>
		<v-card width="500px">
			<v-row class="my-2" align-center justify-start no-gutters>
				<v-col cols="2" align-self="center">
                    <!-- Avatar -->
					<router-link :to="{ name: 'PerfilOtros', params: { idUsuario: pub.id_usuario._id}}">
					<v-avatar class="ml-3" size="45">
						<img :src="$serverURL + pub.id_usuario.profile_image" />
					</v-avatar>
					</router-link>
				</v-col>
				<v-col cols="10" class="pl-3">
					<v-row no-gutters>
						<v-col cols="6">
							<router-link style="text-decoration:none;color:black" :to="{ name: 'PerfilOtros', params: { idUsuario: pub.id_usuario._id}}">
							<span class="caption">{{ pub.id_usuario.nombre | capitalize }} {{ pub.id_usuario.apellido | capitalize }}</span>
							</router-link>
						</v-col>
						<v-spacer></v-spacer>
						<v-col>
							<span class="caption" style="color:gray">{{ tipoPublicacion }}</span>
						</v-col>
					</v-row>
					<v-row no-gutters>
						<v-col>
							<span class="body-2"><router-link style="text-decoration:none;color:black" :to="{name: 'VerPublicacion', params: { idPublicacion: pub._id}}">{{ pub.titulo }}</router-link></span>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-divider></v-divider>
            <!-- Imagenes -->
			<v-carousel v-show="showImage" height="150px" hide-delimiters>
				<v-carousel-item
					v-for="(item,i) in pub.imagenes"
					:key="i"
					:src="$serverURL + item.file_path"
					reverse-transition="fade-transition"
					transition="fade-transition"
				></v-carousel-item>
			</v-carousel>
			<v-divider></v-divider>
            <!-- Cuerpo de la publicacion -->
			<v-card-text>
				<div style="white-space: pre-line">{{ pub.contenido}}</div>
				<br><div style="color:#558755" v-if="tipoPublicacion !== 'Social'">Precio: {{ pub.precio | formatPrice }} Bs</div>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-flex row align-center>
					<div class="ml-3">
						<v-btn icon small class="ml-1">
							<v-icon>mdi-chat-processing</v-icon>
						</v-btn>
						<v-btn small icon class="ml-1">
							<v-icon>mdi-thumb-up</v-icon>
						</v-btn>
					</div>
					<v-spacer></v-spacer>
					<v-btn color="primary" v-if="isLogged && !isSameUser" @click="crearConversacion()">CONTACTAR</v-btn>
				</v-flex>
			</v-card-actions>
		</v-card>
	</v-layout>
</template>

<script>

import { postConversacion } from '../services/sConversacion'

export default {
	props: ["pub", "showImage"],
	filters: {
		capitalize: function(value) {
			if (!value) return "";
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		},

		formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    	}
	},
	computed: {
		tipoPublicacion() {
			switch(this.pub.tipo) {
				case 1 :
					return 'Producto'
					break;
				case 2 : 
					return 'Servicio'
					break;
				case 3 : 
					return 'Social'
					break;
			}
		},
				isLogged() {
			if (this.$store.state.usuario.token) {
				return true;
			} else {
				return false;
			}
		},

		isSameUser() {
			if(this.$store.state.usuario.id == this.pub.id_usuario._id) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {

		crearConversacion() {
			if(this.$store.state.usuario.id == this.pub.id_usuario._id) {
				console.log("No puedes iniciar una conversacion contigo mismo")
			} else {
				
				postConversacion(this.pub.id_usuario._id, this.$store.state.usuario.token)
				.then( res => {
					if(typeof res.data.CODE_ERROR !== 'undefined') {
						console.log("ya existe la conversacion")
						this.$router.push({name: 'Conversacion', params: {idConversacion: res.data.conv[0]._id}})
					} else {
						console.log("conversacion creada")
						this.$router.push({name: 'Conversacion', params: {idConversacion: res.data.doc._id}})
					}

				}).catch(error => {
					console.log(error)
				})
			}
		}

	}
};
</script>

<style >

</style>