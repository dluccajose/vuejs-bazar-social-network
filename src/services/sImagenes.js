import { apiService } from './config'

// Subir multiples imagens pertenecientes a una publicacion
function subirImagenMulti(idPub, img, token) {

    var formData = new FormData()
    img.forEach( img => {
        formData.append('imagenes', img)
    })
    formData.append('idPost', idPub)
    formData.append('tipo', 1)

    return apiService.post("/media/multi", formData ,{
        headers: { 'Authorization': 'Bearer ' + token,
                   'Content-Type': 'multipart/form-data' }
    }).then( res => res)
      .catch(error => Promise.reject(error))

}

function subirImagenSingle(img, token) {
    var formData = new FormData()
    formData.append('file_path', img)
    formData.append('tipo', 1)

    return apiService.post("/media", formData ,{
        headers: { 'Authorization': 'Bearer ' + token,
                   'Content-Type': 'multipart/form-data' }
    }).then( res => res)
      .catch(error => Promise.reject(error))
}

// Imagenes pertenecientes a un post
function getImagenesPub(idPub) {
    
    return apiService.get(`/media/post/${idPub}`)
                            .then( res => res)
                            .catch( err => Promise.reject(err))
}

export { 
    subirImagenMulti,
    getImagenesPub,
    subirImagenSingle
} 