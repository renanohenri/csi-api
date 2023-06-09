const database = require('../infra/database.js');



exports.authUser = (usuario) =>{
    return database.query("select * from usuario where email = $1", [usuario.email])
}

exports.getUsuario = () => {
    return database.query('select u.*, d.name as nameD from usuario u join departamento d on u.departamento_id = d.id');
}

exports.getUsuarioId = (id) => {
    return database.query('select * from usuario where id = $1', [id])
}

exports.postUsuario = (usuario) => {
    console.log(usuario);
    return database.query(
        'insert into usuario(name, email, password, departamento_id) values ($1, $2, $3, $4) returning *', 
        [usuario.name, usuario.email, usuario.password, usuario.department]
    );
}

exports.putUsuario = (newuser) => {
    console.log(newuser);
    return database.query(
        'update usuario set name = $1, email = $2, departamento_id = $3 where id =' + newuser.id, 
        [newuser.name, newuser.email, newuser.department]
    );
}