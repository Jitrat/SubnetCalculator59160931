const mongoose = require("mongoose");
const User = require("../models/user");

exports.user_signup = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists",
                    success: false

                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: req.body.password,
                });
                user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created",
                            success: true
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};

exports.user_login = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "No e-mail exist.",
                    success: false,
                });
            } else {
                if (user[0].password === req.body.password) {
                    return res.status(200).json({
                        message: "Login successfully",
                        success: true
                    })
                } else {
                    return res.status(401).json({
                        message: "Login Failed",
                        success: false
                    })
                }
            }
        })
};