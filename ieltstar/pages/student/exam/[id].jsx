import QuestionsView from "../../../components/TestComponents/QuestionsView/QuestionView";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Fab } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function exam() {
  const handle = useFullScreenHandle();
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [exams, setExams] = useState([]);
  
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios
        .get(`${process.env.API_URL}/exams/${id}/tests`)
        .then((res) => {
          //test order - Listening, Reading, Writing, Speaking
          let data = res.data;
          let flattenExam = [];
          flattenExam.push(
            data
              .filter((item) => item.category === "Listening")
              .sort((a, b) => a.section - b.section)
          );
          flattenExam.push(
            data
              .filter((item) => item.category === "Reading")
              .sort((a, b) => a.section - b.section)
          );
          flattenExam.push(
            data
              .filter((item) => item.category === "Writing")
              .sort((a, b) => a.section - b.section)
          );
          flattenExam.push(
            data
              .filter((item) => item.category === "Speaking")
              .sort((a, b) => a.section - b.section)
          );
          console.log(flattenExam.flat());
          setExams(flattenExam.flat());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <>
      <FullScreen handle={handle}>
        <Box
          sx={{
            background: theme.palette.mode === "dark" ? "" : "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <QuestionsView
            exams={exams}
          ></QuestionsView>
        </Box>
      </FullScreen>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handle.enter}
        sx={{
          position: "fixed",
          bottom: 26,
          right: 26,
        }}
      >
        <FullscreenIcon />
      </Fab>
    </>
  );

  //Create a test ID while starting test
  //After submitting: score ID
}
