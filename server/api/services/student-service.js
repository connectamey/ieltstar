import Student from "./../models/Student.js";
import mongoose from "mongoose";

//Get all students from the database
export const get = async () => {
    //Find all students in the database and return them
    const students = await Student.find();    
    return students;
}

//get student by id from database
export const getById = async (id) => {
    //Find the student with the given id and return it
    const student = await Student.findById(id);
    return student;
}

//check if the student exists in the database
export const getByEmail = async (email) => {
    //Find the student with the given email and return it
    const student = await Student.findOne
    ({email
    });
    return student;
}

//Save a student to the database
export const save = async (student) => {
    //Create a new student and return the saved student
    const newStudent = new Student(student);
    return await newStudent.save();    
}

//Update a student in the database
export const update = async (student) => {
    //Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(student.params.id)) throw new Error('Invalid ID');
    //Find the student by id and update it with the new data, update the lastModifiedDate as well and return the updated student
    const updatedStudent = await Student.findByIdAndUpdate(student.params.id, student.body, { new: true });
    return updatedStudent;
}

//Delete a student from the database
export const remove = async (id) => {
    //Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    //Delete the student from the database based on id passed and return the deleted student
    await Student.findByIdAndRemove(id);
    return `Student ${id} deleted successfully.`;
}

//add a test history to a student
export const addHistory = async (studentId, testHistory) => {
    //Find the student with the given id and add the test history to it, return the updated student
    const student = await Student.findByIdAndUpdate
    (
        studentId,
        {
            $push: { testHistory: testHistory }
        },
        { new: true }
    );
    return student;
}