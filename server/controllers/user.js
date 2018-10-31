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
    if (req.body.facebookLogin === true) {
        User.find({
            email: req.body.email
        })
        .exec()
        .then( user => {
            if (user.length < 1 ){
                const newDate = new Date().toLocaleString('th-Th', {timeZone: 'Asia/Bangkok'})
                const userNew = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: req.body.password,
                    Timestamp: newDate
                });
                userNew.save()
                    .then(result => {
                        console.log(result);
                        return res.status(200).json({
                            message: "Login successfully",
                            success: true,
                            user: result
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                const newDate = new Date().toLocaleString('th-Th', {timeZone: 'Asia/Bangkok'})
                User.findOneAndUpdate(
                    {
                        _id: user[0]._id
                    },
                    {
                        $push: {
                        Timestamp: newDate
                        }
                    },
                    {
                        upsert:true
                    }
                    )
                    .exec()
                    .then( result => {
                        return res.status(200).json({
                            message: "Login successfully",
                            success: true,
                            user: result
                        })
        
                    })
                    .catch( err => {
                        console.log(err);
                    })
            }
        })
        .catch( err => {
            console.log(err);
        })

    } else {

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
                    const newDate = new Date().toLocaleString('th-Th', {timeZone: 'Asia/Bangkok'})
                    User.findOneAndUpdate(
                        {
                            _id: user[0]._id
                        },
                        {
                            $push: {
                            Timestamp: newDate
                            }
                        },
                        {
                            upsert:true
                        }
                        )
                        .exec()
                        .then( result => {
                            return res.status(200).json({
                                message: "Login successfully",
                                success: true,
                                user: result
                            })

                        })
                        .catch( err => {
                            console.log(err);
                        })

                } else {
                    return res.status(401).json({
                        message: "Login Failed",
                        success: false
                    })
                }
            }
        })
        .catch( error => {
            console.log(error);
        })
    }   
};

exports.user_loginFacebook = (req, res, next) => {
    const newDate = new Date().toLocaleString('th-Th', {timeZone: 'Asia/Bangkok'})

    User.find({
        email: req.body.email
    })
    .exec()
    .then( user => {
        if (user.length < 1 ){
            const userNew = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: "",
                Timestamp: newDate
            });
            userNew.save()
                .then(result => {
                    console.log(result);
                    return res.status(200).json({
                        message: "Login successfully",
                        success: true,
                        user: result
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            User.findOneAndUpdate(
                {
                    _id: user[0]._id
                },
                {
                    $push: {
                    Timestamp: newDate
                    }
                },
                {
                    upsert:true
                }
                )
                .exec()
                .then( result => {
                    return res.status(200).json({
                        message: "Login successfully",
                        success: true,
                        user: result
                    })
    
                })
                .catch( err => {
                    console.log(err);
                })
        }
    })
    .catch( err => {
        console.log(err);
    })
 
};

exports.user_detail = (req, res, next) => {
    const id = req.params.userId;
    console.log(id);
    User.findById(id)
        .select("email password Timestamp")
        .exec()
        .then(doc => {
            console.log(`from db ${doc}`);
            if (doc) {
                res.status(200).json({
                    user: doc,
                })
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided id"
                })
            }
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({ error: err });
        })
}