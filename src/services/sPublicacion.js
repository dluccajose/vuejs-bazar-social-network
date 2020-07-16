import { apiService } from './config'


function crearPublicacion(pub, tipoP, token) {

    return apiService.post('/publicacion', {
                idCategoria: pub.categoria,
                tipo: tipoP,
                titulo: pub.titulo,
                contenido: pub.descripcion,
                precio: pub.precio
            }, {
                headers: { 'Authorization': 'Bearer ' + token }
            }).then( res => res)
            .catch(error => Promise.reject(error))
}

// Busca publicaciones que contengan la variable "query" paginando los resultados desde la variable "inicio" hasta "final"
function buscarPublicacion(query, inicio, final) {

    return apiService.get(`/buscar/publicacion/${query}/${inicio}/${final}`)
                    .then( res => res)
                    .catch( error => Promise.reject(error))
}

// Busca la informacion de una publicacion en especifico
function getPublicacion(idPub) {
    return apiService.get(`/publicacion/${idPub}`)
                        .then( res => res)
                        .catch(error => Promise.reject(error))
}


function getPublicacionesUser(id, from, to) {

    return apiService.get(`/publicaciones/${id}/${from}/${to}`)
                        .then( res => res)
                        .catch( error => Promise.reject(error))
}

// Incluye publicaciones desactivadas
function getPublicacionesUserAll(id, from, to) {

    return apiService.get(`/publicaciones/${id}/${from}/${to}/all`)
                        .then( res => res)
                        .catch( error => Promise.reject(error))
}


function eliminarPublicacion(idPub, token) {

    return apiService.delete(`/publicacion/${idPub}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then( res => res)
    .catch( error => Promise.reject(error))

}


function desactivarPublicacion(idPub, token) {
    return apiService.put(`/publicacion/desactivar/${idPub}`, {},  {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then( res => res)
    .catch( error => Promise.reject(error))
}

function activarPublicacion(idPub, token) {
    return apiService.put(`/publicacion/activar/${idPub}`, {},  {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then( res => res)
    .catch( error => Promise.reject(error))
}


function modificarPublicacion(idPub, pub, token) {
    return apiService.put(`/publicacion/${idPub}`, {
        titulo: pub.titulo,
        idCategoria: pub.id_categoria._id,
        contenido: pub.contenido,
        precio: pub.precio,
        tipo: pub.tipo
    }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then( res => res)
    .catch( error => Promise.reject(error))
}

export { 
    crearPublicacion, 
    buscarPublicacion, 
    getPublicacion, 
    getPublicacionesUser, 
    eliminarPublicacion, 
    desactivarPublicacion,
    activarPublicacion,
    getPublicacionesUserAll,
    modificarPublicacion
}
