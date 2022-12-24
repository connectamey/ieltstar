//Pass the app to the routes
import scoreRouter from "./score-router.js";
import examRouter from "./exam-router.js";
import testRouter from "./test-router.js";
import studentRouter from "./student-router.js";
import emailRouter from "./email-router.js";
import smsRouter from "./sms-router.js";

const routes = (app) => {
  app.use("/score", scoreRouter);
  app.use("/exams", examRouter);
  app.use("/tests", testRouter);
  app.use("/students", studentRouter);
  app.use("/email", emailRouter);
  app.use("/sms", smsRouter);
};

export default routes;
