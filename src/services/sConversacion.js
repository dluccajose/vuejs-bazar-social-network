import { apiService } from './config'

function getConversaciones(token) {
    
    return apiService.get("/conversaciones", { headers: { 'Authorization': 'bearer ' + token}}).then( res => res)
    .catch(error => Promise.reject(error))
        
}

function postConversacion(idReceiver, token) {

    return apiService.post('/conversacion', {
        id_receiver: idReceiver
    }, { headers: { 'Authorization': 'bearer ' + token}}).then( res => res)
    .catch(error => Promise.reject(error))

}
    
export { getConversaciones, postConversacion }
