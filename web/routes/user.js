const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Student = require('../../model/student');

// API root endpoint

router.get('/root', (req, res) => {
    return res.status(200).json({
        message: 'Hello World'
    })
});

// signup route for student access from http://localhost:3000/user/signup

router.post('/signup', (req, res, next) => {
    Student.find({ student_email: req.body.student_email })
        .exec()
        .then(student => {
            if (student.length >= 1) {
                return res.status(409).json({
                    message: 'Student\'s Mail Exists'
                })
            } else {
                bcrypt.hash(req.body.student_password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        console.log("New Student Added.");
                        console.log("hasing password = " + hash);
                        const student = new Student({
                            _id: new mongoose.Types.ObjectId(),
                            student_email: req.body.student_email,
                            student_name: req.body.student_name,
                            student_batch: req.body.student_batch,
                            student_password: hash
                        });
                        student
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'New Student Signed up.',
                                    student_email: req.body.email,
                                    student_name: req.body.name,
                                    student_batch: req.body.nicName,
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })

});

//login route for student access from http://localhost:3000/user/login

router.post("/login", (req, res, next) => {
    Student.find({ student_email: req.body.student_email })
        .exec()
        .then(student => {
            if (student.length < 1) {
                return res.status(401).json({
                    message: 'Authantication failed. E-mail not exist.'
                });
            }
            bcrypt.compare(req.body.student_password, student[0].student_password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authantication Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            student_email: student[0].student_email,
                            userId: student[0].userId
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Authantication Successful'
                    });
                }
                res.status(401).json({
                    message: 'Authantication Failed. Password is not correct.'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// student delete route access from http://localhost:3000/user/login

router.delete("/deleteStudent", (req, res, next) => {
    Student.remove({ student_email: req.body.student_email })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Student Deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;