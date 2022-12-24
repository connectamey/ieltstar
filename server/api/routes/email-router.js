import express from "express";
import * as sendEmail from "../controllers/email-controller.js";

const Router = express.Router();

Router.route("/:id").post(sendEmail.sendEmails);

export default Router;
