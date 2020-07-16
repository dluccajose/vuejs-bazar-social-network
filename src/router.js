import Vue from 'vue'
import Router from 'vue-router'

// Componentes
import Inicio from './components/Inicio.vue'
import PublicarPost from './components/PublicarPost.vue'
import PublicarPostInfo from './components/PublicarPostInfo.vue'
import VistaPreviaPost from './components/VistaPreviaPost.vue'
import ReestablecerPass from './components/ReestablecerPass.vue'
import ReestablecerPass2 from './components/ReestablecerPass2.vue'
import CrearCategoria from './components/admin/AdminCrearCategoria.vue'
import IniciarS from './components/IniciarS.vue'
import Registrar from './components/Registrar.vue'
import EditarPerfil from './components/EditarPerfil.vue'
import Inbox from './components/Inbox.vue'
import Mensaje from './components/Mensaje.vue'
import Categorias from './components/Categorias.vue'
import Perfil from './components/Perfil.vue'
import VerCategoria from './components/VerCategoria.vue'
import Solicitudes from './components/Solicitudes.vue'
import Busquedad from './components/Busquedad.vue'
import BuscarPublicaciones from './components/BuscadorPublicaciones.vue'
import VerPublicacion from './components/VerPublicacion.vue'
import CategoriasSeguidas from './components/CategoriasSeguidas.vue'
import AdminPanel from './components/admin/AdminPanel.vue'
import AdminCategorias from './components/admin/AdminCategorias.vue'
import PerfilOtros from './components/PerfilOtros.vue'
import ListaAmigos from './components/ListaAmigos.vue'
import EditarCategoria from './components/admin/AdminEditarCategoria.vue'
import AdministrarPublicaciones from './components/AdministrarPublicaciones.vue'
import EditarPublicacion from './components/EditarPublicacion.vue'
import EditarFotoPerfil from './components/editarFotoPerfil.vue'


Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/timeline',
      name: 'Inicio',
      component: Inicio,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/nuevoPost',
      name: 'PublicarPost',
      component: PublicarPost,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/nuevoPost/info',
      name: 'PublicarPostInfo',
      component: PublicarPostInfo,
      props: true,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/nuevoPost/vistaPrevia',
      name: 'VistaPreviaPost',
      component: VistaPreviaPost,
      props: true,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/reestablecerC',
      name: 'ReestablecerPass',
      component: ReestablecerPass,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/reestablecerC2',
      name: 'ReestablecerPass2',
      component: ReestablecerPass2,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/editarfotoperfil',
      name: 'EditarFotoPerfil',
      component: EditarFotoPerfil,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/adminPanel/categorias/crear',
      name: 'CrearCategoria',
      component: CrearCategoria,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/adminPanel/categorias/editar/:id',
      name: 'EditarCategoria',
      component: EditarCategoria,
      props: true,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/',
      name: 'Sesion',
      component: IniciarS,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registrar,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/editarP',
      name: 'EditarPerfil',
      component: EditarPerfil,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/Inbox',
      name: 'Inbox',
      component: Inbox,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/Mensaje',
      name: 'Mensaje',
      component: Mensaje,
      meta: {
        isPublic: false
      }
    }
    ,
    {
      path: '/Categorias',
      name: 'Categorias',
      component: Categorias,
      meta: {
        isPublic: true
      }
    },{
      path: '/CategoriasSeguidas',
      name: 'CategoriasSeguidas',
      component: CategoriasSeguidas,
    },
    { 
      path: '/perfil',
      name: 'Perfil',
      component: Perfil,
      meta: {
        isPublic: false
      }
    },
    { 
      path: '/categoria/:idCategoria',
      name: 'VerCategoria',
      component: VerCategoria,
      props: true,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/solicitudes',
      name: 'Solicitudes',
      component: Solicitudes,
    },
    { 
      path: '/publicaciones/buscar',
      name: 'BuscarPublicaciones',
      component: BuscarPublicaciones,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/busqueda',
      name: 'Busqueda',
      component: Busquedad,
    },
    {
      path: '/publicacion/:idPublicacion',
      name: 'VerPublicacion',
      component: VerPublicacion,
      props: true,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/adminPanel',
      name: 'AdminPanel',
      component: AdminPanel,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/adminPanel/categorias',
      name: 'AdminCategorias',
      component: AdminCategorias,
      meta: {
        isPublic: false
      }
    },
    { 
      path: '/perfilOtros/:idUsuario',
      name: 'PerfilOtros',
      component: PerfilOtros,
      props: true,
      meta: {
        isPublic: true
      }
    },
    { 
      path: '/listaAmigos/:idUsuario',
      name: 'ListaAmigos',
      component: ListaAmigos,
      props: true,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/Conversacion/:idConversacion',
      name: 'Conversacion',
      component: Mensaje,
      props: true,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/usuario/publicaciones',
      name: 'AdministrarPublicaciones',
      component: AdministrarPublicaciones,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/publicacion/editar/:idPublicacion',
      name: 'EditarPublicacion',
      component: EditarPublicacion,
      props: true,
      meta: {
        isPublic: false
      }
    }
  ]
})

// Privacidad para rutas no publicas
router.beforeEach((to, from, next) => {

  // Si la ruta no es publica y el usuario no ha iniciado sesion, devolvemos al login
  if( !to.meta.isPublic && !localStorage.userToken) {
    return next("/")
  }

  // Si el usuario ya inicio sesion e intenta entrar al login, redigirimos al timeline
  if( to.path === '/' && localStorage.userToken) {
    return next("/timeline")
  }
  
  return next()
})

export { router }
