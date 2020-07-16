<template>
  <v-card>
    <v-tabs background-color="white" color="deep-purple accent-4" centered
      icons-and-text>
      <!-- Cabecera de tabs -->
      <v-tab>Productos</v-tab>
      <v-tab>Servicios</v-tab>
      <v-tab-item  :key="1">
        <v-container fluid grid-list-sm style="margin-bottom: 50px;">
          <v-layout wrap>
            <template v-for="(i, index) in categorias">
              <v-flex :key="i._id" v-if="i.tipo ==1" xs6 md4 lg3>
                <v-card-actions class="white justify-center">
                  Categoria {{i.nombre}} 
                </v-card-actions>
                <v-card-actions>
                  <v-img :src="$serverURL + i.file_path"
                  aspect-ratio="1"
                  ></v-img>
                </v-card-actions>
                <v-card-actions class="white justify-center">
                  <div v-if="isLogged">
                    <v-btn class="primary ma-1"  v-if="!i.seguida" v-on:click="seguir(i._id,index)" :id="i._id">
                      <v-icon>mdi-plus</v-icon>Seguir
                    </v-btn>
                    <v-btn class="error ma-1"  v-if="i.seguida" v-on:click="dejar(i._id,index)" :id="i._id">
                      <v-icon>mdi-plus</v-icon>Dejar
                    </v-btn>
                  </div>
                  <v-btn class="primary"  :to="{ name: 'VerCategoria', params: { idCategoria: i._id}}">
                    <v-icon>mdi-eye</v-icon>Ver
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </template>
            <template v-if="categorias.filter((c)=>c.tipo == 1).length == 0">
                  No Hay categorias seguidas
              </template>
          </v-layout>
        </v-container>
      </v-tab-item>
      <v-tab-item  :key="2">
        <v-container fluid grid-list-sm style="margin-bottom: 50px;">
          <v-layout wrap>
            <template v-for="(i, index) in categorias">
              <v-flex :key="i._id" v-if="i.tipo ==2" xs6 md4 lg3>
                <v-card-actions class="white justify-center">
                  Categoria {{i.nombre}} 
                </v-card-actions>
                <v-card-actions>
                  <v-img :src="$serverURL + i.file_path"
                  aspect-ratio="1"
                  ></v-img>
                </v-card-actions>
                <v-card-actions class="white justify-center">
                  <div v-if="isLogged">
                    <v-btn class="error ma-1"  v-if="i.seguida" v-on:click="dejar(i._id,index)" :id="i._id">
                      <v-icon>mdi-close-circle-outline</v-icon>Dejar
                    </v-btn>
                  </div>
                  <v-btn class="primary" :to="{ name: 'VerCategoria', params: { idCategoria: i._id}}">
                    <v-icon>mdi-eye</v-icon>Ver
                  </v-btn>
                </v-card-actions>
              </v-flex>
              
              </template>
              <template v-if="categorias.filter((c)=>c.tipo == 2).length == 0">
                  No Hay categorias seguidas
              </template>
          </v-layout>
        </v-container>
      </v-tab-item>
    </v-tabs>
    <div class="loader" v-show="isLoading">
      <v-progress-circular indeterminate color="purple" size="60"></v-progress-circular>
    </div>
  </v-card>
</template>

<script>
import { getCategoriasSeguidas} from "../services/sCategoria"
import { agregarFollowing} from "../services/sFollowing_cat"
import { eliminarFollowing} from "../services/sFollowing_cat"
export default {
  data(){
      return{
        categorias:[],
        isLoading: true,
        n:1,
      };
  },
  computed: {
    isLogged() {
      if(this.$store.state.usuario.token) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.$forceUpdate();
  },
  methods:{
    dejar: function (e,index){
        eliminarFollowing(e, this.$store.state.usuario.token).then( res => {
          this.categorias[index].seguida = false;
          this.categorias.splice(index,1)
          console.log(res.data.message)
        }).catch( error => {
          console.log(error)
        })
        
      }
  },
  created: function() {
    getCategoriasSeguidas(this.$store.state.usuario.token).then( res => {
      this.categorias = res.data
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