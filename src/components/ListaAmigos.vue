<template>
      <v-container
        fluid
        fill-height
      >
        <v-layout
         
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
           <!-- Datos del perfil -->
            <v-card class="elevation-4 mb-6">
             <v-layout>
               <div style="width:120px; height:120px">
                     <v-avatar size="120" tile  >
                         <img :src="$serverURL + usuario.profile_image"/> 
                    </v-avatar>
               </div>
                <v-flex>
                 <span class="title ml-3 ">{{ usuario.nombre }} {{ usuario.apellido }}</span><br />
                 <span class="subtitle-1 ml-3" style="color:gray">{{usuario.id_estado.nombre}} - {{usuario.ciudad}}</span>
                 <v-divider></v-divider>
                 <v-card-actions>
                   <v-btn icon  small to="/editarp" v-if="verIcon">
                      <v-icon >mdi-account-edit</v-icon>
                    </v-btn>
                   </v-card-actions>
              </v-flex>
              </v-layout>
            </v-card>
            
            <!-- Mis Amigos -->
            <v-layout justify-center mx-0 mt-4>
                <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-list subheader>
      <v-subheader>Mis Amigos</v-subheader>

      <v-list-item v-for=" amigo in amigos" :key="amigo._id"  >
        <v-list-item-avatar>
          <v-img :src="$serverURL + amigo.profile_image"></v-img>
        </v-list-item-avatar>
        <router-link :to="{name:'PerfilOtros',params:{idUsuario:amigo._id}}">
        <v-list-item-content>
          <v-list-item-title v-text="amigo.nombre +' '+ amigo.apellido"></v-list-item-title>
        </v-list-item-content>
        </router-link>
        <!-- Falta hacer el router link hacia la pagina de mensajes -->
        <v-list-item-icon>
          <v-icon color="grey" >mdi-message</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

  </v-card>
            </v-layout>
            
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { getUsuario , getAmigosUsuario } from "../services/sUsuario"
  export default {
    props: {
      source: String,
    },
    data: () => ({
      items2: [
                {
                    src: 'https://image.prntscr.com/image/q9EP1WZBTLS-u4FtCUPK8A.png'
                },
                 {
                    src: 'https://image.prntscr.com/image/qWiydeDaTEmKzI_m-TxG-A.png'
                }
            ],
      usuario: '',
      amigos: '',
      verIcon: false
    }),
    props: ["idUsuario"],
    
    created: function() {
    
    if(this.idUsuario==this.$store.state.usuario.id)
    {
      this.verIcon=true
    }
		// Cargamos los estados
		getUsuario(this.idUsuario).then( res => {
			this.usuario = res.data
			console.log(res.data)
		}).catch( error => {
			console.log(error)
    })
    // Cargamos los amigos del Usuario
  	getAmigosUsuario(this.idUsuario, this.$store.state.usuario.token).then( res => {
      this.amigos = res.data
			console.log(res.data)
		}).catch( error => {
			console.log(error)
    })
  },
  
  }
</script>