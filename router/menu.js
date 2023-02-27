const express = require("express")
const menuController = require("../controllers/menu")
const md_auth = require("../middlewares/authenticate")

const api =express.Router();

api.post("/menu", [md_auth.asureAuth], menuController.createMenu)
api.get("/menu", menuController.getMenus)
api.patch("/menu/:id",  [md_auth.asureAuth], menuController.updateMenu)
api.delete("/menu/:id", [md_auth.asureAuth], menuController.deleteMenu)

module.exports = api;