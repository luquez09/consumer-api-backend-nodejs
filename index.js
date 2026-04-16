const express = require('express')
const connectionDb = require('./config/dataBase');

const app = express();

connectionDb();

app.use(express.json());

app.use('/api/clinic', require('./routes/ClinicPatient'));
app.use('/api/history', require('./routes/HistoryPatient'));

app.listen(4000, () => {
    console.log("Servidor en puerto 400, iniciado");
});