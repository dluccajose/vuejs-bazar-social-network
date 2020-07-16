import { apiService } from './config'

function consultarSolicitudes(token) {
    return apiService.get("/solicitudes", {headers: {'Authorization': 'Bearer ' + token} })
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
function consultarSolicitudes2(id_sender,id_receiver) {
    return apiService.get(`/solicitudes2/${id_sender}/${id_receiver}`)
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
function aceptarSolicitud(id) {
    return apiService.put("/solicitud/a/" + id)
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
function rechazarSolicitud(id) {
    return apiService.put("/solicitud/r/" + id)
        .then( res => res)
        .catch( error => {
            console.log("tu")
            return Promise.reject(error)
        })
}
function buscar(val) {
    return apiService.get("/usuarios", {params: {val}})
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
function cancelarSolicitud(id, token) {
    return apiService.delete("/solicitud/" + id, {headers: {'Authorization': 'Bearer ' + token} })
        .then( res => res)
        .catch( error => {
            console.log("tu")
            return Promise.reject(error)
        })
}
function enviarSolicitud(id,  token) {
    return apiService.post("/solicitud",{id_receiver: id}, {headers: {'Authorization': 'Bearer ' + token} })
        .then( res => res)
        .catch( error => {
            console.log("tu")
            return Promise.reject(error)
        })
}
export{ consultarSolicitudes,
        consultarSolicitudes2,
        aceptarSolicitud,
        rechazarSolicitud,
        buscar,
        cancelarSolicitud,
        enviarSolicitud
}