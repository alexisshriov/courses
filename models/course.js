const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate")

const CourseSchedma = mongoose.Schema({
    title: String,
    minature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,
})

CourseSchedma.plugin(mongoosePaginate)

module.exports = mongoose.model("Course", CourseSchedma)