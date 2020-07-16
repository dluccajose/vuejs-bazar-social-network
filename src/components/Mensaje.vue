<template>
<v-card >
			   	  
<v-card  class="overflow-y-auto" height="485" max-height="485" id="scroll-target" outlined>  
             <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <span class="name">  {{ msg.user }} </span> <br>
                  <span class="content"> {{ msg.message }} </span>
              </div>     
</v-card>
	
    <v-form @submit.prevent="sendMessage">
        
      <v-card outlined height="70">           
             <v-row >
                 <v-col  cols="9" sm="4" md="5">       
                <v-text-field min-width="10"  v-model="message" class="form-control"  placeholder="Mensaje" ></v-text-field>
             </v-col>

                <v-col  cols="1"   sm="7"    md="4">        
                    <v-btn  type="submit" class="btn btn-success" >Enviar</v-btn>        
                </v-col>
                
             </v-row>
      </v-card> 
    </v-form>
     
  </v-card>
</template>

<script>

import io from 'socket.io-client';
import { getMensajes } from "../services/sMensajes";
import { guardarMensaje } from "../services/sMensajes";

export default {
    data() {
        return {
            user: this.$store.state.usuario.nombre,
            message: ' ',
            messages: [],
            mensajesbd: [],
            socket : io('localhost:3001'),

            mensajeguardar: { 
                id_usuario: this.$store.state.usuario.id,
                id_conversacion: this.idConversacion,
                contenido: ' '
            }

        }
    },

    props: [ 'idConversacion' ],

     mounted() {
        this.socket.on('conversation private post', (data) => {
            this.messages = [...this.messages, data];
          
        });
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('send message', {
                user: this.user,
                message: this.message,
                room: this.idConversacion
            });
            this.messages.push({user: "Tú", message: this.message, room: this.idConversacion});
            this.mensajeguardar.contenido = this.message,
            guardarMensaje(this.mensajeguardar)
            this.message = ' '
          
            
        },

        CargarMensajes: function() {
            for(var i=0; i<this.mensajesbd.length; i++)
            {            
                this.messages.push({user: this.mensajesbd[i].id_usuario.nombre , message: this.mensajesbd[i].contenido, room: this.idConversacion});
            }
    
   }
    },
    
    created:  
      
    
    function()
    {
        



      getMensajes(this.idConversacion, this.$store.state.usuario.token).then( res => {
      this.mensajesbd = res.data
    
		this.CargarMensajes();	
		}).catch( error => {
			console.log(error)
    }),
    
    
    
    
    this.socket.emit('subscribe', this.idConversacion)

    // client side code
   this.socket.emit('create', 'room1');
    } 

   
}
</script>

<style>
 .messages{
    box-sizing: border-box;
  
    overflow-y: auto;
    padding: 10px;
    background-color: #ffffff;
  }
   .messages .content{
    padding: 8px;
    background-color: rgb(185, 164, 224);
    border-radius: 5px;
    display:inline-block;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
    max-width: 70%;

    }
    .messages .name {
        padding: 1px;
    
      text-shadow: rgb(139, 134, 134) 2px 2px 3px;
    display:inline-block;
    font-size: 60%;
    max-width: 65%;
    word-wrap: break-word;
    }
    .barra {
        padding: 1px;
    
      text-shadow: rgb(139, 134, 134) 2px 2px 3px;
    display:inline-block;
    font-size: 60%;
    word-wrap: break-word;
    }
</style>
