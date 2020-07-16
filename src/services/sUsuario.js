import { apiService } from './config'


function registrarUsuario(user) {

    var cedula = user.cedulaPrefijo + user.cedula
    
    return apiService.post('/usuario' , {
        email: user.correo.toLowerCase(),
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        cedula: cedula,
        fechaNac: user.fechaNac,
        ciudad: user.ciudad,
        idEstado: user.estado
    }).then(res => res)
    .catch( error => {
        return Promise.reject(error)
    })
}
function modificarUsuario(user,token) {
    
    return apiService.put('/usuario/modificar' , {
        email: user.email,
        password: user.password,
        ciudad: user.ciudad,
        idEstado: user.id_estado._id},
        { headers: {'Authorization': 'Bearer ' + token }
    }).then(res => res)
    .catch( error => {
        return Promise.reject(error)
    })
}
function modificarFoto(imagen,token) {
    
    return apiService.put('/usuario/foto' , {
        profile_image: imagen},
      { headers: {'Authorization': 'Bearer ' + token }
    }).then(res => res)
    .catch( error => {
        return Promise.reject(error)
    })
}
function login(correo, password) {
    return apiService.post('/login', {
        email: correo.toLowerCase(),
        password: password
    }).then( res => res)
    .catch( error => {
        return Promise.reject(error)
    })
}


function getUsuario(id) {

    return apiService.get(`/usuario/${id}`)
        .then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}
function getAmigosUsuario(id,token) {

    return apiService.get(`/amigos/${id}`,{
        headers: {'Authorization': 'Bearer ' + token }
    }).then( res => res)
        .catch( error => {
            return Promise.reject(error)
        })
}

export { 
    getAmigosUsuario,
    modificarUsuario,
    modificarFoto,
    getUsuario,
    registrarUsuario,
    login }