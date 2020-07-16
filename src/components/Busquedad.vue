<!--emplate>
  <v-card>
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="nombre"
        item-value="_id"
        label="Buscar Personas"
        placeholder="Buscar"
        prepend-icon="mdi-magnify"
        return-object
      >
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else >
            <v-list-item-avatar>
              <img ::src= "'http://localhost:3030/' + data.item.profile_image">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.apellido"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
  </v-card>
</template-->

<template>
  <v-content>
    <v-container fluid fill-height>
        <v-layout justify-center mx-0>
            <v-card width="500px">
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field 
                      :value="model"
                        @input="search"
                        outlined
                        clearable
                        label="Buscar Perosna"
                        type="text"
                      >
                        <template v-slot:append>
                      
                            <v-icon>mdi-account-search-outline</v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
                <v-list >
                <v-subheader >Personas</v-subheader>
                <template v-for="(item, index) in items">
                    <v-divider :key="item.header"></v-divider>
                    <v-list-item :key="item._id">
                      <v-list-item-avatar>
                          <v-img :src="$serverURL + item.profile_image"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                          <v-list-item-title v-html="item.nombre+' '+item.apellido"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.ciudad"></v-list-item-subtitle>
                          <div class="text-center">
                              <v-btn class="ma-1" color="primary" v-if="item.estado_solicitud == -1" v-on:click="enviarSolicitud(item.id_solicitud, index)" :id="item._id">
                              <small><v-icon left>mdi-account-plus</v-icon>Enviar solicitud</small>
                              </v-btn>
                              <v-btn class="ma-1" color="error" v-if="item.estado_solicitud == 0 && !item.sender" v-on:click=" cancelarSolicitud(item.id_solicitud, index)" :id="item._id">
                              <small><v-icon left>mdi-account-remove</v-icon>Cancelar</small>
                              </v-btn>
                              <v-btn class="ma-1" color="error" v-if="item.estado_solicitud == 0 &&item.sender" v-on:click="rechazarSolicitud(item.id_solicitud, index)" :id="item._id">
                              <small><v-icon left>mdi-account-remove</v-icon>Rechazar</small>
                              </v-btn>
                              <v-btn class="ma-1" color="primary" v-if="item.estado_solicitud == 0 &&item.sender" v-on:click="aceptarSolicitud(item.id_solicitud, index)" :id="item._id">
                              <small><v-icon left>mdi-account-plus</v-icon>Aceptar </small>
                              </v-btn>
                              <v-btn class="ma-1" color="primary" v-if="(!item.sender && item.estado_solicitud == 0) || (item.estado_solicitud != 0)" :id="item._id">
                              <small><v-icon left>mdi-eye</v-icon>Ver</small>
                              </v-btn>
                          </div>
                      </v-list-item-content>
                    </v-list-item>              
                </template>
                <template v-if="items.length == 0">
                  <div class="text-center">No se encontraron resultados</div>
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
  import { buscar } from "../services/sSolicitudes"
  import { aceptarSolicitud } from "../services/sSolicitudes"
  import { rechazarSolicitud } from "../services/sSolicitudes"
  import { cancelarSolicitud } from "../services/sSolicitudes"
  import { enviarSolicitud } from "../services/sSolicitudes"
  import { debounce } from "debounce"
  export default {
    data: () => ({
      descriptionLimit: 60,
      items: [],
      isLoading: false,
      model: null,
    }),
    created: function() {
      this.search = debounce(this.search, 300);
    },
    methods: {
      search (val) {
       

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true
        buscar(val).then( res => {
          this.count = 10;
          this.items = res.data
        }).catch( error => {
          console.log(error)
        }).finally(() => (this.isLoading = false))
      },
      aceptarSolicitud: function (e,index){
        aceptarSolicitud(e).then( res => {
          this.isLoading =false
          this.items[index].estado_solicitud = 1
        }).catch( error => {
          console.log(error)
        })
        this.items.splice(index,1)
      },
      rechazarSolicitud: function (e,index){
        rechazarSolicitud(e, this.$store.state.usuario.token).then( res => {
          this.isLoading = false
          this.items[index].estado_solicitud = 2;
        }).catch( error => {
          console.log(error)
        })
        
      },
      cancelarSolicitud: function (e,index){
        cancelarSolicitud(e, this.$store.state.usuario.token).then( res => {
          this.isLoading = false
          this.items[index].estado_solicitud = -1;
        }).catch( error => {
          console.log(error)
        })
        
      },
      enviarSolicitud: function (e,index){
        enviarSolicitud(e, this.$store.state.usuario.token).then( res => {
          this.isLoading = false
          this.items[index].estado_solicitud = 0;
          this.items[index].sender = false;
        }).catch( error => {
          console.log(error)
        })
        
      }
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

