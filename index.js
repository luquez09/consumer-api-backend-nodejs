const express = require('express')
const connectionDb = require('./src/config/dataBase');

const app = express();

connectionDb();

app.use(express.json());

app.use('/api/clinic',  require('./src/routes/ClinicPatient'));
app.use('/api/history', require('./src/routes/HistoryPatient'));
app.use("/api/latest",  require('./src/routes/TrmConsult'));

app.listen(4000, () => {
    console.log("Servidor en puerto 400, iniciado");
});