const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authMiddleware = require('../auth/auth')
const usuarioService = require('../service/usuarioService.js');
const agendaService = require('../service/agendaService.js');
const geralService = require('../service/geralService.js');


router.post('/authenticate', async (req, res) => {
    const usuario = req.body;
    const auth = await usuarioService.authUsuario(usuario);
    console.log(req.body);

    if( auth[0] === 200){
        const user = auth[1]
        return res.json({
            statusCode: 200,
            user,
            token: jwt.sign(user, 'PRIVATEKEY'),
        });
    } else if( auth === 403 ){
        return res.json({
            statusCode: 403,
            error: "Email ou senha inválida!",
        });
    } else {
        return res.json({
            statusCode: 404,
            error: "Usuário não encontrado!",
        });
    }

});


/**
 * ROTAS PRIVADAS
 */

router.use(authMiddleware);

// usuario crud
router.get('/usuarios', async (req, res) => {
    const usuarios = await usuarioService.getUsuario();
    res.json(usuarios);
})

router.get('/departamentos', async (req, res) => {
    const departamentos = await geralService.getDepartment();
    res.json(departamentos);
})

router.post('/department', async (req, res) => {
    const department = req.body;
    console.log(department.departament);
    const novoDepartmento =  await geralService.postDepartment(department.department);
    res.json(novoDepartmento);
})

router.get('/usuarios/:id', async (req, res) => {
    const usuario = await usuarioService.getUsuarioId(req.params.id);
    res.json(usuario);
})

router.put('/usuarios', async (req, res) => {
    const usuario = req.body;
    console.log(usuario);
    const novoUsuario =  await usuarioService.putUsuario(usuario);
    res.json(novoUsuario);
})

router.post('/usuarios', async (req, res) => {
    const usuario = req.body;
    console.log(usuario);
    const novoUsuario =  await usuarioService.postUsuario(usuario);
    res.json(novoUsuario);
})

router.delete('/usuario/:id', async (req, res) => {
    await usuarioService.deletarUsuario(req.params.id);
    res.json(200);
})

//disponibilidade

router.get('/disponibilidade/:data/:disp', async (req, res) => {
    const disp = await agendaService.getDisponib(req.params.data, req.params.disp);
    res.json(disp);
})


// agenda crud

router.get('/agendas', async (req, res) => {
    const agendas = await agendaService.getAgenda();
    res.json(agendas);
    
})


router.put('/agendas/update', async (req, res) => {
    const agendas = await agendaService.putAgenda(req.body.uuid, req.body.status);
    return res.json(agendas);
})

router.get('/agendas/:id', async (req, res) => {
    const agenda = await agendaService.getAgendaUsuario(req.params.id);
    res.json(agenda);
})

router.post('/agendas', async (req, res) => {
    const agenda = req.body;
    console.log(agenda)
    const novaAgenda =  await agendaService.postAgenda(agenda);
    res.json(novaAgenda);
})

router.delete('/agendas/:id', async (req, res) => {
    console.log("cheguei")
    await agendaService.deleteAgenda(req.params.id);
    res.json(200);
})


module.exports = router;