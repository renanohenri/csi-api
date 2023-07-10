const database = require('../infra/database.js');

exports.getDepartment = () => {
    return database.query('select d.id, d.name, count(u.id) from departamento d left join usuario u on d.id = u.departamento_id group by (d.id, d.name) order by d.name asc;')
}

exports.postDepartment = (departamento) => {
    return database.query('insert into departamento(name) values ($1)',[departamento])
}