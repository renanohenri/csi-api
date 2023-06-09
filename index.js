const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;

const app = express()


app.options('*', cors())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    app.use(cors());
    next();
});


app.use(express.json());
app.use('/', require('./scr/routes/router'));


app.listen(port, ()=>{
    console.log('Aplicação rodando na porta ' + port)
})


