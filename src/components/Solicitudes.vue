<template id="solicitud">
<v-content>
    <v-container fluid fill-height>
        <v-layout justify-center mx-0>
            <v-card width="500px">
                <v-list three-line>
                <v-subheader >Solicitudes</v-subheader>
                <template v-for="(item, index) in items">
                    <!--v-subheader v-if="!index" :key="item.header">Solicitudes</v-subheader-->
                    <v-divider :key="item.header"></v-divider>
                    <v-list-item :key="item._id">
                      <v-list-item-avatar>
                          <v-img :src="$serverURL + item.id_sender.profile_image"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                          <v-list-item-title v-html="item.id_sender.nombre+' '+item.id_sender.apellido"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.id_sender.ciudad"></v-list-item-subtitle>
                          <div class="text-center">
                              <v-btn class="ma-1" color="primary" v-on:click="aceptarSolicitud(item._id, index)" :id="item._id">
                              <small><v-icon left>mdi-account-check</v-icon>Aceptar</small>
                              </v-btn>
                              <v-btn class="ma-1" color="primary" v-on:click="rechazarSolicitud(item._id, index)" :id="item._id">
                              <small><v-icon left>mdi-account-check</v-icon>Rechazar</small>
                              </v-btn>
                          </div>
                      </v-list-item-content>
                    </v-list-item>              
                </template>
                <template v-if="items.length == 0">
                  <div class="text-center">No Hay Solicitudes</div>
                </template>
                <div class="loader" v-show="isLoading">
                  <v-progress-circular indeterminate color="purple" size="60"></v-progress-circular>
                </div>
                </v-list>
            </v-card>
        </v-layout>
    </v-container>
</v-content>
</template>
<script>
  import { consultarSolicitudes } from "../services/sSolicitudes"
  import { aceptarSolicitud } from "../services/sSolicitudes"
  import { rechazarSolicitud } from "../services/sSolicitudes"
  export default {
    data(){
      return{
        items:{},
        isLoading: true,
        id:'',
      };
    },
    methods: {
      aceptarSolicitud: function (e,index){
        aceptarSolicitud(e).then( res => {
          this.isLoading =false
        }).catch( error => {
          console.log(error)
        })
        this.items.splice(index,1)
      },
      rechazarSolicitud: function (e,index){
        rechazarSolicitud(e).then( res => {
          this.isLoading = false
        }).catch( error => {
          console.log(error)
        })
        this.items.splice(index,1)
      }
    },
    created: function() {
      this.isLoading = true,
      // Cargamos las Solicitudes
      consultarSolicitudes(this.$store.state.usuario.token).then( res => {
        this.items = res.data
        console.log(res.data)
        this.isLoading = false
      }).catch( error => {
        console.log(error)
      })
    },
    
  }
</script>
<style scoped>
.loader {
	position: fixed;
	top: 45%;
	left: 42%;
}
</style>