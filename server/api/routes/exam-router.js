import express from "express";
import * as examController from "../controllers/exam-controller.js";

const Router = express.Router();

//Get and Post routes for tasks
Router.route('/')
    .get(examController.getExams)
    .post(examController.createExam)


//Get, Put and Delete routes with id as the wildcard 
Router.route('/:id')
    .get(examController.getExamById)
    .put(examController.updateExam)
    .delete(examController.deleteExam);

//get all the tests in the exam
Router.route('/:id/tests')
    .get(examController.getTestsInExam)

export default Router;