const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    student: { type: String, required: true },
    course: { type: String, required: true },
    experience: { type: String, required: true },
    grade: { type: Number, required: true }
});

module.exports = mongoose.model('Task', taskSchema);