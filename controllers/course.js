const Course = require("../models/course");
const image = require("../utils/image");


async function createCourse(req, res) {
    const course = new Course(req.body);
  
    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;
  
    course.save((error, courseStored) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear el curso" });
      } else {
        res.status(201).send(courseStored);
      }
    });
  }
  
  async function getCourses(req, res) {
    const {page = 1, limit = 10} = req.query

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    Course.paginate({}, options, (error, courses) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener los cursos" });
          } else {
            res.status(200).send(courses);
          }
    })

    return courses
  }
  
  async function updateCourse(req, res) {
    const {id, body} = req

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature)
        body.miniature = imagePath
    }

    Courses.findByIdAndUpdate({_id: id}, body, (error, course) => {
        if (error) {
            res.status(400).send({ msg: "Error al actualizar curso" });
          } else {
            res.status(200).send({ msg: "Actualizacion correcta" });
          }
    })


    const course = Course.find(id)
  }

  async function deleteCourse (req, res) {
    const { id } = req.params

    Course.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar curso" });
          } else {
            res.status(200).send({ msg: "Curso eliminado correctamente" });
          }
    })

  }

  module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
  };