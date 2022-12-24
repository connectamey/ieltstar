import * as studentService from '../services/student-service.js';
import * as testService from '../services/test-service.js';

// set status and send response
const setResponse = (res, status, data) => {
    res.status(status).json(data);
}

// get all students
export const getStudents = async (req, res) => {
    try {
        const student = await studentService.get();
        setResponse(res, 200, student);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// get student by id
export const getStudentById = async (req, res) => {
    try {
        const student = await studentService.getById(req.params.id);
        setResponse(res, 200, student);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

//get student by email
export const getStudentByEmail = async (req, res) => {
    try {
        const student = await studentService.getByEmail(req.params.email);
        setResponse(res, 200, student);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// create a student
export const createStudent = async (req, res) => {
    try {
        const savedStudent = await studentService.save(req.body);
        setResponse(res, 201, savedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// update a student
export const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await studentService.update(req);
        setResponse(res, 200, updatedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// delete an student
export const deleteStudent = async (req, res) => {
    try {
         //TODO @DELETE ALL THE QUESTIONS ASSOCIATED WITH THIS EXAM
        const deletedStudent = await studentService.remove(req.params.id);
        setResponse(res, 200, deletedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// add student history
export const addTestHistory = async (req, res) => {
    try {
        const {  testId, userResponse, testType } = req.body;
        const student = await studentService.getByEmail(req.params.id);
        const test = await testService.getById(testId);
        if(testType === "Listening" || testType === "Reading") {
            test.questions.forEach((question) => {
                userResponse.forEach(response => {
                    if(response.questionId === question._id.toString()) {
                        response.questionOptions.forEach(option => {
                            if(option.hasOwnProperty('selected')) {
                                if(option.selected && option.que_options == question.answer) {
                                    req.body.score += 1
                                }
                            }
                        })
                    }
                })
            });
            req.body.score = req.body.score / test.questions.length * 9
        }
        else if(testType === "Writing") {
            let score = 9;
            //handle score for writing
            let wordCount = [
                req.body.score[0].wordCount,
                req.body.score[1].wordCount
            ]
            req.body.score = req.body.score.map(score => {
                if(score === 0) {
                    return {
                        suggestionsCount : 0
                    }
                }
                else {
                    return score
                }
            })
            req.body.score = req.body.score[0].suggestionsCount + req.body.score[1].suggestionsCount
            let totalSuggestions = req.body.score * 0.00045;
            score = req.body.score - totalSuggestions;
            if(wordCount[0] < 250) {
                score = req.body.score - 2
            }
            if(wordCount[1] < 150) {
                score = req.body.score - 2
            }
            if(req.body.score < 0) {
                score = 0
            }
            req.body.score = score
        }
        else if(testType === "Speaking") {
            //handle score for speaking
            req.body.score = req.body.score.reduce((prev, current) => prev + current ? current.readabilityScore:0, 0)
            if(req.body.score > 0) {
                req.body.score = req.body.score / 2
            }
            if(req.body.score > 90) {
                req.body.score = 9
            }
            else if(req.body.score > 80) {
                req.body.score = 8.5
            }
            else if(req.body.score > 70) {
                req.body.score = 8
            }
            else if(req.body.score > 60) {
                req.body.score = 7.5
            }
            else if(req.body.score > 50) {
                req.body.score = 7
            }
            else {
                req.body.score = 4.5
            }
        }
        req.body.score =  Math.round(req.body.score*2)/2;
        const updatedStudent = await studentService.addHistory(student._id, req.body);
        setResponse(res, 200, updatedStudent);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}
