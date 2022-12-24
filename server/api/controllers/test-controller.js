import * as testService from '../services/test-service.js';

// set status and send response
const setResponse = (res, status, data) => {
    res.status(status).json(data);
}

//get all tests
export const getAllTests = async (req, res) => {
    try {
        const tests = await testService.get();
        setResponse(res, 200, tests);
    } catch (error) {
        setResponse(res, 500, error);
    }
}

// create a test
export const createTest = async (req, res) => {
    try {
        const savedTest = await testService.save(req.body);
        setResponse(res, 201, savedTest);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// get a test by id
export const getTestById = async (req, res) => {
    try {
        const test = await testService.getById(req.params.id);
        setResponse(res, 200, test);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// update a test
export const updateTest = async (req, res) => {
    try {
        const updatedTest = await testService.update(req);
        setResponse(res, 200, updatedTest);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// delete a test
export const deleteTest = async (req, res) => {
    try {
        const deletedTest = await testService.remove(req.params.id);
        setResponse(res, 200, deletedTest);
    }
    catch (e) {
        setResponse(res, 409, { message: e.message });
    }
}

// get a test by exam id and category
export const getTestByExamIdAndCategory = async (req, res) => {
    try {
        const test = await testService.getByExamIdAndCategory(req.params.examId, req.params.category);
        setResponse(res, 200, test);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// add a question to a test
export const addQuestionToTest = async (req, res) => {
    try {
        const test = await testService.addQuestion(req.params.id, req.body);
        setResponse(res, 200, test);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// update a question in a test
export const updateQuestionInTest = async (req, res) => {
    try {
        const test = await testService.updateQuestion(req.params.id, req.params.questionId, req.body);
        setResponse(res, 200, test);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}

// delete a question from a test
export const deleteQuestionFromTest = async (req, res) => {
    try {
        const test = await testService.deleteQuestion(req.params.id, req.params.questionId);
        setResponse(res, 200, test);
    }
    catch (e) {
        setResponse(res, 400, { message: e.message });
    }
}