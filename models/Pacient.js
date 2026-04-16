const mongoose = require("mongoose");

const PacientSchema = mongoose.Schema({
    fullNamePacient: {
        type: String,
        required: true
    },
    locationPacient: {
        type: String,
        required: true
    },
    estatePacient: {
        type: Boolean,
        required: false
    },
    dateCreatePacient: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ClinicPatient', PacientSchema);