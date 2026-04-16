const Pacient = require("../models/Pacient");

exports.addPacient = async (req, res) => {
    try {
        let pacient;

        pacient = new Pacient(req.body);
        await pacient.save();
        res.send(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).send("Se presento un error.");
    }
}

exports.selectPacient = async (req, res) => {
    try {
        const pacient = await Pacient.find();
        res.json(pacient);
    } catch (error) {
        console.log("Error al consultar los pacientes.");

    }
}