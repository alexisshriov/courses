const bcrypt = require("bcryptjs")
const User = require("../models/user")
const image = require("../ultils/image")

async function getMe(req, res){
    const { user_id } = req.user;
    const response = await User.findById(user_id)

    if(!response){
        res.status(400).send({ msg: "User Not Found" });
    } else {
        res.status(200).send(response)
    }

}

async function getUsers(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    ...req.body,
    active: false,
    password: hashPassword,
  });

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar)
    user.avatar = imagePath
  }

  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el usuario" });
    } else {
      res.status(201).send(userStored);
    }
  });
}

async function updateUser (req, res){
  const userData = req.body;
  const { id } = req.params;

  console.log(req.body)

  if(userData.password){
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    
    userData.password = hashPassword
  } else {
    delete userData.password;
  }
  
  if(req.files.avatar){
    const imagePath = image.getFilePath(req.files.avatar)
    userData.avatar = imagePath
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error updating usero" });
    } else {
      res.status(200).send({msg: "Update Successful"});
    }
  });
}

async function deleteUser (req, res){
    const {id} = req.params

    User.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: "Error removing user"})
        }else{
            res.status(200).send({msg: "User removed"})
        }
        
    })
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};