const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentsSchema = new Schema({
    studentlist: {type: String, required: true},
    gradelist:{type: Number, required: true},
});

module.exports = mongoose.model('Student', studentsSchema);
