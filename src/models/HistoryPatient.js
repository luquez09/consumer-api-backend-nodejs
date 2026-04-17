const mongoose = require("mongoose");

const HistoryPatientSchema = mongoose.Schema({

    doctor: {
        type: String,
        require: true
    },
    dateCreate: {
        type: Date,
    },
    description: {
        type: String
    },
    identificationPatient: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('ClinicHistory', HistoryPatientSchema);