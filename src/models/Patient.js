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
    },
    identification: {
        type: Number,
        require: true,
        unique: true
    },
})

module.exports = mongoose.model('ClinicPatient', PacientSchema);