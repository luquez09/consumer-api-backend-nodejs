const express = require('express')
const connectionDb = require('./config/dataBase');

const app = express();

//Conexion a la base de datos.
connectionDb();

//Configuracion de middleware
app.use(express.json());

app.use('/api/clinic', require('./routes/ClinicPaciente'));

app.listen(4000, () => {
    console.log("Servidor en puerto 400, iniciado");
});