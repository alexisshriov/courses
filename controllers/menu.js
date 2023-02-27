const Menu = require("../models/menu")

async function createMenu(req, res) {
  const menuData = req.body;

  if (!menuData) {
    res.status(400).send({ msg: "no data received" });
  } else {
    const menu = new Menu(menuData);
    menu.save((error, menuStored) => {
      if (error) {
        res.status(400).send({ msg: "Error creating MEnu" });
      } else {
        res.status(200).send(menuStored);
      }
    });
  }
}

async function getMenus(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find().sort({ order: "asc" });
  } else {
    response = await User.find({ active }).sort({ order: "asc" });
  }

  if (!response) {
    res.status(400).send({ msg: "menus not found" });
  }
  res.status(200).send(response);
}

async function updateMenu (req, res){
    const{ id } = req.params
    const menuData = req.body

    Menu.findByIdAndUpdate({_id: id}, menuData, (error) => {
        if(error){
            res.status(400).send({ msg: "Error updating menu"})
        } else {
            res.status(200).send({msg: "Update Successful"});
        }
    })
}

async function deleteMenu(req, res) {
    const {id} = req.params

    Menu.findByIdAndDelete( id, (error) => {
        if(error){
            res.status(400).send({ msg: "Error deliting menu"})
        }else {

        }res.status(200).send({msg: "delete Successful"});
    })
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};