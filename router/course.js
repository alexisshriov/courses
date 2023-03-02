const express = require("express");
const courseController = require("../controllers/course");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticate");

const md_upload = multiparty({ uploadDir: "./uploads/course" });

const api = express.Router();
api.post("/course", [md_auth.asureAuth, md_upload], courseController.createCourse);
api.get("/course", [md_auth.asureAuth], courseController.getCourses);
api.patch("/course/:id", [md_auth.asureAuth], courseController.updateCourse);
api.delete("/course/:id", [md_auth.asureAuth], courseController.deleteCourse)

module.exports = api;
