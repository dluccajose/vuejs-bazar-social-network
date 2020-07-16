import { apiService } from './config'
function enviarSolicitud(idAmigo,token) {

    return apiService.post('/solicitud' , {
     id_receiver: idAmigo }
     ,
     { headers: {'Authorization': 'Bearer ' + token }
    }).then(res => res)
    .catch( error => {
        return Promise.reject(error)
    })
}
export { 
    enviarSolicitud
}