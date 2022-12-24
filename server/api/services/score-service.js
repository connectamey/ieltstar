import Score from "./../models/score.js";

/**
 * Service for save
 * @param {*} newScore
 * @returns
 */
export const save = (newScore) => {
  const score = new Score(newScore);
  return score.save();
};

/**
 * Service for search
 * @param {*} query
 * @returns
 */
export const search = (query) => {
  const params = { ...query };
  return Score.find(params).exec();
};
/**
 * Service for get
 * @param {*} id
 * @returns
 */
export const get = (id) => {
  const scoreItem = Score.findById(id).exec();
  return scoreItem;
};
/**
 * Service for update
 * @param {*} updatedScore
 * @returns
 */
export const update = (updatedScore) => {
  const scoreItem = Score.findByIdAndUpdate(updatedScore.id, updatedScore, {
    new: true,
  }).exec();
  return scoreItem;
};
/**
 * Service for delete
 * @param {*} id
 * @returns
 */
export const remove = (id) => {
  const scoreItem = Score.findByIdAndDelete(id).exec();
  return scoreItem;
};
