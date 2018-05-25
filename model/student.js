const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student_name: { type: String, require: true},
    student_batch: { type: String, require: true},
    student_email: { 
        type: String, 
        require: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    student_password: { type: String, require: true }
});

module.exports = mongoose.model('student', studentSchema);