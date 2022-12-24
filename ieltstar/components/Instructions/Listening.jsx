import { Divider, Typography } from "@mui/material";
const Listening = () => {
    return (
      <>
        <h1>Test Format – Listening (30 minutes)</h1>
        <Typography variant="body" sx={{m: 1}}>
          The Listening component consists of 40 questions. You will listen to
          four recorded texts, such as monologues and conversations, by a range of
          native-speakers and write your answers to a series of questions. These
          include questions that test your ability to understand main ideas and
          detailed factual information, ability to understand the opinions and
          attitudes of speakers, ability to understand the purpose of an utterance
          and the ability to follow the development of ideas. A variety of voices
          and native-speaker accents are used and each part is heard only once.
        </Typography>
        <Divider />
        <Typography variant="subtitle1" sx={{m: 1}}>
          Part 1:- A conversation between two people set in an everyday social context.{" "}
          <br />
          Part 2:- A monologue set in an everyday social context, e.g. a speech about local
          facilities.
          <br />
          Part 3: -A conversation between up to four people set in an educational or
          training context, e.g. a university tutor and a student discussing an
          assignment.
          <br />
          Part 4:- A monologue on an academic subject, e.g. a university lecture.
          <br />
        </Typography>
      </>
    );
  };
  
  export default Listening;
  