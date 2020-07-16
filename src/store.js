import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Inicializamos el estado con la informacion disponible en localStorage
    usuario: {
      nombre: localStorage.userNombre,
      apellido: localStorage.userApellido,
      correo: localStorage.userCorreo,
      token: localStorage.userToken,
      id: localStorage.userId,
      tipo: localStorage.userTipo,
      /* avatar: localStorage.userAvatar */
      },
      buscarPublicacion: {
        query: ''
      }
  },
  mutations: {
    // Guardamos informacion del usuario al iniciar sesion
    iniciarSesion(state) {
      if(localStorage.userToken) {
        state.usuario.token = localStorage.userToken
        state.usuario.nombre = localStorage.userNombre
        state.usuario.apellido = localStorage.userApellido
        state.usuario.correo = localStorage.userCorreo
        state.usuario.id = localStorage.userId
        state.usuario.tipo = localStorage.userTipo
        state.usuario.avatar = localStorage.userAvatar
      }
    },
    // Eliminamos informacion del usuario al cerrar sesion
    cerrarSesion(state) {
      state.usuario.token = ''
      state.usuario.nombre = ''
      state.usuario.apellido = ''
      state.usuario.correo = ''
      state.usuario.id = ''
      state.usuario.tipo = ''
      state.usuario.avatar = ''
    },
    // Buscar publicacion
    buscarPublicacion(state, query) {
      state.buscarPublicacion.query =  query
    }

  },
  actions: {

  }
})
