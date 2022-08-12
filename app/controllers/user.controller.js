const Users = require("../models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.CreateUser = async (req, res) => {
    const data = new Users({
        username: req.body.username,
        email_address: req.body.email_address,
        password: bcrypt.hashSync(req.body.password, 12),
    })
    try {
        const dataToSave = data.save()
        return res.status(200).send(data)
    }
    catch (err) {
        return res.status(500).json(err)
    }
};

exports.Signin = (req, res) => {
    Users.findOne({
        where: {
            email_address: req.body.email_address
        },
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "account Not found." });
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: user.id,
                username: user.username,
                email_address: user.email_address,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.FindAll = async (req, res) => {
    const data = await Users.find()
    try {
        return res.status(200).json(data)
    }
    catch (err) {
        return res.status(500).json(err)
    }
};
exports.FindOne = async (req, res) => {
    const data = await Users.findOne({
        _id: req.body.id,
    })
    try {
        return res.status(200).json(data)
    }
    catch (err) {
        return res.status(500).json(err)
    }
};


exports.Destroyed = async (req, res) => {
    const data = await Users.findOne({ _id: req.body.id })
    try {
        await Users.deleteOne({ _id: data.id })
        return res.status(200).json('Successful Delete')
    }
    catch (err) {
        return res.status(500).json(err)
    }
};