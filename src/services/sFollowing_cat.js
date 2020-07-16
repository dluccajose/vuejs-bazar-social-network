import { apiService } from './config'

function agregarFollowing(e, token) {

    return apiService.post("/following_cat",{id :e},{headers: {'Authorization': 'Bearer ' + token} })
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
function eliminarFollowing(e, token) {
    return apiService.delete("/following_cat/"+e , {headers: {'Authorization': 'Bearer ' + token} })
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
export { agregarFollowing,
        eliminarFollowing }