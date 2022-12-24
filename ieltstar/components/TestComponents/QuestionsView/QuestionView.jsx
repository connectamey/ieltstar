import { useEffect, useState, forwardRef } from "react";
import Timer from "../Timer/Timer";
import Quiz from "./Quiz";
import { useUser } from "@auth0/nextjs-auth0/client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import axios from "axios";
import Box from "@mui/material/Box";
import ReadingInstructions from "../../Instructions/Reading";
import ListeningInstructions from "../../Instructions/Listening";
import WritingInstructions from "../../Instructions/Writing";
import SpeakingInstructions from "../../Instructions/Speaking";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ScoreBoard from '../../ScoreBoard/ScoreBoard';

//Navigation buttons
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//Shows section instructions
const getInstructions = (type) => {
  switch (type) {
    case "Reading":
      return <ReadingInstructions />;
    case "Listening":
      return <ListeningInstructions />;
    case "Writing":
      return <WritingInstructions />;
    case "Speaking":
      return <SpeakingInstructions />;
    default:
      return <div>no instructions</div>;
  }
};
//Actual questions component
const QuestionView = ({ exams }) => {
  const [open, setOpen] = useState(true);
  const [currentInsctruction, setCurrentInsctruction] = useState("Listening");
  const [test, setTest] = useState({});
  const [email, setEmail] = useState("");
  const [initial, setInitial] = useState(true);
  const user = useUser().user;
  const [scoreOpen, setScoreOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(initial) {
      setInitial(false);
    }
    else {
      let index = exams.findIndex((item) => item._id === test._id);
      if (index < exams.length - 1) {
        setTest(exams[index + 1]);
      } else {
        //fire score dialog here
      }
    }
    setOpen(false);
   
  };


  

  useEffect(() => {
    if (exams.length > 0) {
      setTest(exams[0]);
    }
  }, [exams]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  //Opens next section

  const getNextTest = () => {
    let index = exams.findIndex((item) => item._id === test._id);
    //check if last exam
    if (index === exams.length - 1) {
      console.log("fire score");
      setScoreOpen(true);
    }
    else if(exams[index + 1].category !== exams[index].category) { 
      setCurrentInsctruction(exams[index + 1].category);
      setOpen(true);
    }
    else {
      handleClose();
    }
   
  };

  return (
    <section>
      <Timer />
      <Quiz test={test} getNextTest={getNextTest} user={email}/>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        disableEscapeKeyDown
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
           
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Instructions
            </Typography>
          </Toolbar>
        </AppBar>
       <Box sx={{display: "flex", alignItems: "left", justifyContent: "left", flexDirection: "column", height: "100%", p: 10}}>
        {getInstructions(currentInsctruction)} 
        <br />
        <Button onClick={handleClose} variant="outlined" endIcon={<PlayCircleIcon />} size="large" color="warning">
        {currentInsctruction === "Listening" ? "Start" : "Next"}
</Button>
       </Box>
      </Dialog>
      <ScoreBoard open={scoreOpen} setOpen={setScoreOpen}></ScoreBoard>
    </section>
  );
};

export default QuestionView;
