const express = require("express")
const { API_VERSION } = require("./contants")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

// import routing
const authRoutes = require('./router/auth')
const userRoutes = require("./router/user")
const menuRoutes = require("./router/menu")
const courseRoutes = require("./router/course")
const postRoutes = require("./router/post")
const newsletterRoutes = require("./router/newsletter")

//configure body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// configure static folder
app.use(express.static("uploads"))

// Configure Header HTTP Cors
app.use(cors())

// configure routings
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes)
app.use(`/api/${API_VERSION}`, courseRoutes)
app.use(`/api/${API_VERSION}`, postRoutes)
app.use(`/api/${API_VERSION}`, newsletterRoutes)

module.exports = app;

  