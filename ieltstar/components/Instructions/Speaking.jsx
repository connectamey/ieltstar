import {  Typography } from "@mui/material";
const Speaking = () => {
  return (
    <>
      <h1>Test Format – Speaking (11-14 minutes)</h1>
      <Typography variant="body" sx={{m: 1}}>
        Part 1:- You will hear the examiner’s voice. He will ask you general questions
        about yourself and a range of familiar topics, such as home, family,
        work, studies and interests. This part lasts between four and five
        minutes.
        <br />
        Part 2:- You will hear a question that asks you to talk about a particular topic.
        You will have one minute to prepare before speaking for up to two
        minutes. You will then hear one or two questions on the same topic to
        finish this part of the test.
        <br />
        Part 3:- You will hear further questions connected to the topic in Part 2. These
        questions will give you the opportunity to discuss more abstract ideas
        and issues. This part of the test lasts between four and five minutes.
      </Typography>
    </>
  );
};

export default Speaking;
