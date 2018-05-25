const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teacher_name: { type: String, require: true},
    teacher_subject: { type: String, require: true},
    teacher_email: { 
        type: String, 
        require: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    teacher_password: { type: String, require: true }
});

module.exports = mongoose.model('teacher', teacherSchema);