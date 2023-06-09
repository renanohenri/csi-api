const res = require('express/lib/response');
const agendaData = require('../data/agendaData');
const { result } = require('../infra/database');

const IPAD_TOTAL = 100;

exports.getAgenda = async () => {
    return await agendaData.getAgenda()
}

exports.getAgendaUsuario = async (id) => {
    return await agendaData.getAgendaUsuario(id);
};

exports.putAgenda = async (uuid, status) => {
    return await agendaData.putAgenda(uuid, status);
}

exports.postAgenda = async (agenda) => {
    return await agendaData.postAgenda(agenda);
};

exports.getDisponib = async (data, periodo) => {

    var result = await agendaData.getDisponib(data, periodo)
    

    return result[0].sum != null ? (IPAD_TOTAL - parseInt(result[0].sum)) : IPAD_TOTAL;
}