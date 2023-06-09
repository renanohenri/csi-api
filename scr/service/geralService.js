const geralData = require('../data/geralData');


exports.getDepartment = async () => {
    return geralData.getDepartment();
}


exports.postDepartment = async (departamento) => {
    return geralData.postDepartment(departamento);
}