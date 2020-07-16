import { apiService } from './config'

function eliminarAmistad(token,id_receiver) {

    return apiService.delete(`/amigos/${id_receiver}`, {headers: {'Authorization': 'Bearer ' + token} })
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
export { 
  eliminarAmistad }