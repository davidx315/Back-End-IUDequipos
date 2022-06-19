const express = require('express');

const app = express();
const fileUpload = require('express-fileupload');
const usuarios = require('./routes/usuario');
const tipoEquipos = require('./routes/tipoEquipo');
const estadosEquipos = require('./routes/estadoEquipo');
const marcas = require('./routes/marca');
const inventarios = require('./routes/inventario');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(fileUpload({
     useTempFiles : true,
     tempFileDir : '/tmp/'
}));

app.use('/api/usuarios', usuarios);
app.use('/api/tipoEquipos', tipoEquipos);
app.use('/api/estados', estadosEquipos);
app.use('/api/marcas', marcas);
app.use('/api/inventarios', inventarios);
module.exports = app;