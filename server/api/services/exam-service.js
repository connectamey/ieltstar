import Exam from "./../models/Exam.js";
import Test from "./../models/Test.js";
import mongoose from "mongoose";

//Get all exams from the database
export const get = async () => {
    //Find all exams in the database and return them
    const exams = await Exam.find();    
    return exams;
}

//get exam by id from database
export const getById = async (id) => {
    //Find the exam with the given id and return it
    const exam = await Exam.findById(id);
    return exam;
}

//Save a exam to the database
export const save = async (exam) => {
    //Create a new exam and return the saved exam
    const newExam = new Exam(exam);
    return await newExam.save();    
}

//Update a exam in the database
export const update = async (exam) => {
    //Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(exam.params.id)) throw new Error('Invalid ID');
    //Find the exam by id and update it with the new data, update the lastModifiedDate as well and return the updated exam
    const updatedExam = await Exam.findByIdAndUpdate(exam.params.id, exam.body, { new: true });
    return updatedExam;
}

//Delete a exam from the database
export const remove = async (id) => {
    //Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    //Delete the exam from the database based on id passed and return the deleted exam
    await Exam.findByIdAndRemove(id);
    return `Exam ${id} deleted successfully.`;
}

//Get all the tests in the exam
export const getTestsInExam = async (id) => {
    //Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
   //get the tests with the id
    const tests = await Test.find({examId: id});
    return tests;
}
