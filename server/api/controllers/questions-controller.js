import { request, response } from "express";
import * as questionsService from "./../services/questions-service.js";
/**
 * Set success response
 * @param {*} obj
 * @param {*} response
 */
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};
/**
 * Set error response
 * @param {*} obj
 * @param {*} response
 */
const setErrorResponse = (obj, response) => {
  response.status(500);
  response.json(obj);
};
/**
 * Post API request method
 * @param {*} request
 * @param {*} response
 */
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const questions = await questionsService.save(payload);
    setSuccessResponse(questions, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
/**
 * Search based on user input
 * @param {*} request
 * @param {*} response
 */
export const index = async (request, response) => {
  try {
    const title = request.query.title;
    const description = request.query.description;
    const query = {};

    if (title) {
      query.title = title;
    }

    if (description) {
      query.description = description;
    }

    console.log(query);

    const questions = await questionsService.search(query);
    setSuccessResponse(questions, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
/**
 * Get API request method
 * @param {*} request
 * @param {*} response
 */
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const questions = await questionsService.get(id);
    setSuccessResponse(questions, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
/**
 * Update API request method
 * @param {*} request
 * @param {*} response
 */
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updated = { ...request.body };
    updated.id = id;
    updated.status = "Completed";
    const questions = await questionsService.update(updated);
    setSuccessResponse(questions, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
/**
 * Delete API request method
 * @param {*} request
 * @param {*} response
 */
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const questions = await questionsService.remove(id);
    setSuccessResponse({ message: `Successfully removed ${id}` }, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
