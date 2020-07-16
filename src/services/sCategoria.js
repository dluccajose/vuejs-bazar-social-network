import { apiService } from './config'

/* Obtiene todas las publicaciones que pertenecen al ID de la categoria
   indicada. Los parametros "from" y "to" sirven para realizar la paginacion de los resultados
*/

function publicacionesPorCategoria(id, from, to) {
    return apiService.get(`/publicaciones/v2/cat/${id}/${from}/${to}`)
                .then( res => res)
                .catch( error => Promise.reject(error))
}
function getAllCategorias() {
    return apiService.get("/categorias")
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}

function getCategoriasSeguidas(token) {
    return apiService.get("/categorias/s/", {headers: {'Authorization': 'Bearer ' + token} })
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}

function getAllCategoriasLogin(idUsuario) {
    return apiService.get(`/categorias/${idUsuario}`)
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}



function crearCategoria(nombre, tipo, imagenPath, token) {

    return apiService.post("/categoria", {
        nombre: nombre,
        tipo: tipo,
        file_path: imagenPath
    }, {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then( res => res)
    .catch( error => Promise.reject(error))
}

function eliminarCategoria(idCat, token) {
    return apiService.delete(`/categoria/${idCat}`, {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then( res => res)
    .catch( error => Promise.reject(error))
}

function getCategoria(idCat) {

    return apiService.get(`/categoria/${idCat}`)
                        .then( res => res)
                        .catch( error => Promise.reject(error))
}


function editarCategoria(idCat, nombre, tipo, token) {

    var body = {
        nombre: nombre,
        tipo: tipo
    }

    return apiService.put(`/categoria/${idCat}`, body, {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then( res => res)
    .catch( error => Promise.reject(error))
}

export {  
    publicacionesPorCategoria,
    getAllCategorias,
    crearCategoria,
    eliminarCategoria,
    getAllCategoriasLogin,
    getCategoriasSeguidas,
    getCategoria,
    editarCategoria
} 


