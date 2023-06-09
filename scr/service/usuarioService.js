const usuarioData = require('../data/usuarioData');
const nodemailer = require('nodemailer');

const HttpCodes = {
    success : 200,
    notFound : 404,
    Forbidden: 403
    // etc
}

exports.authUsuario = async (usuario) => {
    const user = await usuarioData.authUser(usuario);

    if(user.length === 0){
        return HttpCodes.notFound;
    } else {
        if (usuario.password === user[0].password){
            delete user[0].password
            delete user[0].email
            delete user[0].departamento_id
            return [HttpCodes.success, user[0]]
        } else {
            return HttpCodes.Forbidden;
        }
    }
}

exports.getUsuario = async () => {
    return await usuarioData.getUsuario()
}

exports.getUsuarioId = async (id) => {
    return await usuarioData.getUsuarioId(id);
}

exports.postUsuario = async (usuario) => {
    const user = await usuarioData.postUsuario(usuario);
    return user;
};

exports.putUsuario = async (newuser) => {
    return await usuarioData.putUsuario(newuser)
}