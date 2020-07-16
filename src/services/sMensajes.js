import { apiService } from './config'

function getMensajes(id, token) {

    return apiService.get(`/mensajes/${id}`, { headers: { 'Authorization': 'bearer ' + token } }).then(res => res)
        .catch(error => Promise.reject(error))


}

function guardarMensaje(men) {


    return apiService.post('/mensaje', {

        id_usuario: men.id_usuario,
        id_conversacion: men.id_conversacion,
        contenido: men.contenido


    }).then(res => res)
        .catch(error => {
            return Promise.reject(error)
        })
}

export { getMensajes, guardarMensaje }
