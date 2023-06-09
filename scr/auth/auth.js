const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function validate(req, res, next){

    const { authorization } = req.headers;

    console.log(authorization)
    
    if(!authorization){
        return res.sendStatus(401);
    }

    const [,token] = authorization.split(' ');

    try{

        await promisify(jwt.verify)(token, 'PRIVATEKEY');
        return next();

    }catch (err){
        console.log(err);
        return res.sendStatus(401);
    }

}

module.exports = validate;