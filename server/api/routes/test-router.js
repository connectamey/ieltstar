import express from "express";
import * as testController from "../controllers/test-controller.js";

const Router = express.Router();

//Create a test for a particular exam
Router.route('/')
    .post(testController.createTest)
    .get(testController.getAllTests);

//Get, Put and Delete routes with test id as the wildcard
Router.route('/:id')
    .get(testController.getTestById)
    .put(testController.updateTest)
    .delete(testController.deleteTest);

//Add a question to a test
Router.route('/:id/questions') 
    .post(testController.addQuestionToTest)

//Update or delete a question in the test
Router.route('/:id/questions/:questionId')
    .put(testController.updateQuestionInTest)
    .delete(testController.deleteQuestionFromTest)    

//Get a test of particular type by exam id
Router.route('/:examId/:category')
    .get(testController.getTestByExamIdAndCategory)
   

export default Router;