const Pacient = require("../models/Patient");

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
        res.status(500).send("Error al consultar.")
    }
}

exports.updatePacient = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const pacientUpdated = await Pacient.findByIdAndUpdate(
            id, 
            updateData, 
            { 
                new: true,
                runValidators: true
            }
        );

        if (!pacientUpdated) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        res.status(200).json(pacientUpdated);
    } catch (error) {
        console.log("Error al actualizar el paciente");
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};

exports.findPacient= async (req, res) => {
    const { id } = req.params;

    try {
        const pacientUpdated = await Pacient.findById( id );

        if (!pacientUpdated) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        res.status(200).json(pacientUpdated);
    } catch (error) {
        console.log("Error al consultar el paciente");
        res.status(500).json({ message: "Error al consultar", error: error.message });
    }
}

exports.deletePacient= async (req, res) => {
    const { id } = req.params;

    try {
        const pacientUpdated = await Pacient.findById( id );

        if (!pacientUpdated) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        await Pacient.findByIdAndDelete(id);
        res.status(200).json({response: "Paciente eliminado exitosamente."});
    
    } catch (error) {
        console.log("Error al eliminar el paciente");
        res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
}
