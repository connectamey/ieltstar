import express from "express";
import * as scoreController from "./../controllers/score-controller.js";

const router = express.Router();
/**
 * GET/POST Routes created using questions/
 */
router.route("/").post(scoreController.post).get(scoreController.index);

/**
 * GET/POST/DELTE Route created using questions/id
 */
router
  .route("/:id")
  .get(scoreController.get)
  .put(scoreController.update)
  .delete(scoreController.remove);

export default router;
