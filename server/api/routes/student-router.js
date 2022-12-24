import express from "express";
import * as studentController from "../controllers/student-controller.js";

const Router = express.Router();

//Get and Post routes for tasks
Router.route('/')
    .get(studentController.getStudents)
    .post(studentController.createStudent)


//Get, Put and Delete routes with id as the wildcard 
Router.route('/:id')
    .get(studentController.getStudentById)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent);

//Get route for student by email
Router.route('/email/:email')
    .get(studentController.getStudentByEmail);

//Update test history
Router.route('/:id/testHistory')
    .post(studentController.addTestHistory)


export default Router;