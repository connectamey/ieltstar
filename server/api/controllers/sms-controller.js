import Twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = `${process.env.AccountSID}`;
const authToken = `${process.env.AuthToken}`;

const client = Twilio(accountSid, authToken);
// set status and send response
const setResponse = (res, status, data) => {
  res.status(status).json(data);
};

// get all sms
export const sendSms = (req, res) => {
  const id = JSON.stringify(req.params.id);
  console.log(id);
  client.messages
    .create({
      from: `${process.env.FROM_SMS}`,
      to: id,
      body: `Hi ${req.body.name}, Your ielts overall band score is:${req.body.scores.overallBand}. Reading Score:${req.body.scores.readingScore}, Writing Score:${req.body.scores.writingScore}, Speaking Score:${req.body.scores.speakingScore}, Listening Score:${req.body.scores.listeningScore}`,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
};
