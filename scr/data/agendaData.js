const { set } = require('express/lib/application');
const database = require('../infra/database.js');
var uuid = require('uuid');

var HttpCodes = {
    success : 200,
    notFound : 404,
    IntServerError: 500
    // etc
 }

exports.getDisponib = async (data, periodo) => {
    let query = "select sum(qtd_solicitada_ipad) from agenda where data_agendamento ='" + data + "' and periodo_aula = " + periodo
    return await database.query(query);    
}

exports.getAgenda = () => {
    return database.query('select a.*, b.name, p.horario from agenda a inner join usuario b on a.user_id = b.id join periodos p on a.periodo_aula = p.id where a.data_agendamento >= current_date order by data_agendamento asc');
}

exports.putAgenda = (uuid, status) => {

    database.query(
        "update agenda set status = '" + status + "' where uuid = '" + uuid + "'",
    ).catch((e) => {
        console.error;
        return HttpCodes.IntServerError;
    })
5
    return HttpCodes.success;
}

exports.getAgendaUsuario = (id) => {
    return database.query(
        'select data_agendamento::timestamp, qtd_solicitada_ipad, periodo_aula, status from agenda where user_id = $1 and data_agendamento >= current_date order by data_agendamento', [id]
    )
}

exports.postAgenda = (agenda) => {
    return database.query(
        "insert into agenda(data_agendamento, creat_at, user_id, qtd_solicitada_ipad, periodo_aula, status, uuid) values ($1, NOW()::timestamp, $2, $3, $4, $5, $6) returning *", 
        [agenda.data_agendamento, agenda.user_id, agenda.qtd_solicitada_ipad, agenda.periodo_aula, 'AGUARDANDO', uuid.v4()]
    );
}