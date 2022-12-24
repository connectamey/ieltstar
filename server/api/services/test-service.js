import Test from "./../models/Test.js";
import Exam from "./../models/Exam.js";
import mongoose from "mongoose";

//get all tests
export const get = async () => {
    return await Test.find();
}

//Save a test to the database
export const save = async (test) => {
    //check if the exam exits
    const exam = await Exam.findById(test.examId);
    if (!exam) throw new Error('Exam not found');
    //Create a new test and return the saved test
    const newTest = new Test(test);
    return await newTest.save();    
}

//get test by id from database
export const getById = async (id) => {
    //@TODO only admin should be allowed to use this id
    //Find the test with the given id and return it
    const test = await Test.findById(id);
    return test;
}

//Update a test in the database
export const update = async (test) => {
    //Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(test.params.id)) throw new Error('Invalid ID');
    //Find the test by id and update it with the new data, update the lastModifiedDate as well and return the updated test
    const updatedTest = await Test.findByIdAndUpdate(test.params.id, test.body, { new: true });
    return updatedTest;
}

//Delete a test from the database
export const remove = async (id) => {
    //Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    //Delete the test from the database based on id passed and return the deleted test
    await Test.findByIdAndRemove(id);
    return `Test ${id} deleted successfully.`;
}

//get test by exam id and category from database
export const getByExamIdAndCategory = async (examId, category) => {
    //Find the test with the given exam id and category and return it
    const test = await Test.findOne
    (
        {
            examId,
            category
        }
    );
    return test;
}

// add a question to a test
export const addQuestion = async (testId, question) => {
    //Find the test with the given id and add the question to it, return the updated test
    const test = await Test.findByIdAndUpdate
    (
        testId,
        {
            $push: { questions: question }
        },
        { new: true }
    );
    return test;
}

// update a question in a test
export const updateQuestion = async (testId, questionId, question) => {
    //Find the test with the given id and update the question with the given id, return the updated test
    const test = await Test.findOneAndUpdate
    (
        {
            _id: testId,
            "questions._id": questionId
        },
        {
            $set: { "questions.$": question }
        },
        { new: true }
    );
    return test;
}

// delete a question from a test
export const deleteQuestion = async (testId, questionId) => {
    //Find the test with the given id and delete the question with the given id, return the updated test
    const test = await Test.findByIdAndUpdate
    (
        testId,
        {
            $pull: { questions: { _id: questionId } }
        },
        { new: true }
    );
    return test;
}
