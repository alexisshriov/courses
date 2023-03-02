
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const jwt = require("../utils/jwt")


function register(req, res){
    const {firstname, lastname, email, password} = req.body

    if(!email) res.status(400).send({ msg: "El email es obligatorio"})
    if(!password) res.status(400).send({ msg: "El password es obligatorio"})

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
        role: "user",
        active: false
    })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    user.password = hashPassword
    user.save((error, userStorage) => {
        if(error) {
            res.status(400).send({msg: "Error al crear usuario"})
        } else {
            res.status(200).send(userStorage);
        }
    })
}

function login(req, res) {
    const {email, password} = req.body

    if(!email) return res.status(400).send({msg: "email obligatorio"})
    if(!password) return res.status(400).send({msg: "password obligatorio"})

    const emailLowercase = email.toLowerCase();

    User.findOne({email: emailLowercase}, (error, userStorage) => {
        if(error) {
            res.status(500).send({msg: "Error del servidor"})
        }else {
            bcrypt.compare(password, userStorage.password,  (bcryptError, check) => {
                if(bcryptError){
                    res.status(500).send({msg: "Error del servidos"})
                } else if(!check) {
                    res.status(500).send({msg: "Contraseña Incorrecta"})
                } else if(!userStorage.active) {
                    res.status(401).send({msg: "Usuario no autorizado o activo"})
                } else{
                    res.status(200).send({
                        access: jwt.createAccessToken(userStorage),
                        refresh: jwt.createRefreshToken(userStorage),
                    })
                }
            })
        }
            
    })
}

function refreshAcessToken(req, res) {
    const { token } = req.body;

    console.log({token})

    if(!token) res.status(400).send({msg: "Token requerido"})

    const {user_id} = jwt.decode(token);

    User.findOne({_id: user_id}, (error, userStorage) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"})
        } else {
            res.status(200).send({acessToken: jwt.createAccessToken(userStorage)})
        }
    })
}

module.exports = {
    register,
    login,
    refreshAcessToken,
}
