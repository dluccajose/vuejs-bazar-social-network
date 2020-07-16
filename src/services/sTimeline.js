import { apiService } from './config'


/* Obtiene las ultimas publicaciones realizadas y las ordena en orden cronologico.
   Se usa para mostrar a los usuarios invitados que no han inicado sesion. No filtra
   publicaciones por categorias seguidas ni por amistades.

   Metodo solo para usuarios visitantes
   Busca publicaciones desde "from" hasta "to"

*/
function guestGetTimeline(from, to) {
    return apiService.get(`/publicaciones/ultimas/${from}/${to}`)
        .then( res => res)
        .catch( error => Promise.reject(error))
}

function userHomeTimeline(from, to, token) {
    return apiService.get(`/timeline/${from}/${to}`, {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then( res => res)
    .catch( error => Promise.reject(error))
}

export { guestGetTimeline, userHomeTimeline } 