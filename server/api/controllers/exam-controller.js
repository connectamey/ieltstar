import * as examService from '../services/exam-service.js';

// set status and send response
const setResponse = (res, status, data) => {
    res.status(status).json(data);
}

// get all exams
export const getExams = async (req, res) => {
    try {
        const exam = await examService.get();
        setResponse(res, 200, exam);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// get exam by id
export const getExamById = async (req, res) => {
    try {
        const exam = await examService.getById(req.params.id);
        setResponse(res, 200, exam);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// create a exam
export const createExam = async (req, res) => {
    try {
        const savedExam = await examService.save(req.body);
        setResponse(res, 201, savedExam);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// update a exam
export const updateExam = async (req, res) => {
    try {
        const updatedExam = await examService.update(req);
        setResponse(res, 200, updatedExam);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// delete an exam
export const deleteExam = async (req, res) => {
    try {
         //TODO @DELETE ALL THE QUESTIONS ASSOCIATED WITH THIS EXAM
        const deletedExam = await examService.remove(req.params.id);
        setResponse(res, 200, deletedExam);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

//get all the tests in the exam
export const getTestsInExam = async (req, res) => {
    try {
        const tests = await examService.getTestsInExam(req.params.id, "user");
        tests.forEach(test => {
            test.questions.forEach(question => {
                question.answer = null;
            });
        });
        setResponse(res, 200, tests);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}
