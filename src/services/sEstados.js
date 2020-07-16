import { apiService } from './config'

function getAllEstados() {

    return apiService.get("/estados")
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}

export { getAllEstados }