import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();

sgMail.setApiKey(`${process.env.SENDGRID_APIKEY}`);
// set status and send response
const setResponse = (res, status, data) => {
  res.status(status).json(data);
};

// send emails
export const sendEmails = async (req, res) => {
  const options = {
    from: `${process.env.FROM_EMAIL}`,
    to: req.params.id,
    // email subject
    subject: "Ielts Test Scores",
    templateId: `${process.env.SENDGRID_TEMPLATEID}`,
    dynamic_template_data: {
      email: req.body.email,
      name: req.body.name,
      picture: req.body.picture,
      scores: {
        readingScore: req.body.scores.readingScore,
        writingScore: req.body.scores.writingScore,
        speakingScore: req.body.scores.speakingScore,
        listeningScore: req.body.scores.listeningScore,
        overallBand: req.body.scores.overallBand,
      },
    },
  };
  try {
    //   send email using twilio sendgrid
    await sgMail.send(options);
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    //   error handling
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};
