const Patient = require('../models/Patient');
const HistoryPatient = require('../models/HistoryPatient');

const getPatientFullRecord = async (req, res) => {
    try {
        const id = Number(req.params.id); // La identificación que viene en la URL

        // Usamos Promise.all para ejecutar ambas consultas al mismo tiempo
        const [patient, history] = await Promise.all([
            Patient.findOne({ identification: id }),
            HistoryPatient.find({ identificationPacient: id })
        ]);

        // Validar si el paciente existe
        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        // Combinar y devolver el resultado
        const fullRecord = {
            ...patient.toObject(), // Convertimos el documento de mongoose a objeto simple
            medicalHistory: history
        };

        res.status(200).json(fullRecord);

    } catch (error) {
        res.status(500).json({ message: "Error al consultar el historial", error: error.message });
    }
};

module.exports = { getPatientFullRecord };