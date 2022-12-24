import Questions from "./../models/questions.js";

/**
 * Service for save
 * @param {*} newQuestions
 * @returns
 */
export const save = (newQuestions) => {
  const questions = new Questions(newQuestions);
  return questions.save();
};

/**
 * Service for search
 * @param {*} query
 * @returns
 */
export const search = (query) => {
  const params = { ...query };
  return Questions.find(params).exec();
};
/**
 * Service for get
 * @param {*} id
 * @returns
 */
export const get = (id) => {
  const questionItem = Questions.findById(id).exec();
  return questionItem;
};
/**
 * Service for update
 * @param {*} updatedQuestions
 * @returns
 */
export const update = (updatedQuestions) => {
  const questionItem = Questions.findByIdAndUpdate(
    updatedQuestions.id,
    updatedQuestions,
    { new: true }
  ).exec();
  return questionItem;
};
/**
 * Service for delete
 * @param {*} id
 * @returns
 */
export const remove = (id) => {
  const questionItem = Questions.findByIdAndDelete(id).exec();
  return questionItem;
};
