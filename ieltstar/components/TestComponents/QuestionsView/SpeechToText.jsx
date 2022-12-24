import styles from "../../../styles/quizstyles/QuestionView.module.scss";
//Converts speecht to text
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

let demoClientId = "client_9m1fYK3MPQxwKsib5CxtpB";

const StatsOutput = ({ title, stats }) => (
  <section>
    <h3>{title}</h3>
    <pre>{JSON.stringify(stats, null, 2)}</pre>
  </section>
);

const Dictaphone = ({ handler, questionNo, setWritingState }) => {
  // const [grammarlyConfig, setGrammarlyConfig] = useState({ underlines: "on", suggestionCards: "on" })
  const [docStats, setDocStats] = useState();
  const [sessionStats, setSessionStats] = useState();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [language, setLanguage] = useState("en-IN");
  const [data, setData] = useState("");

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  useEffect(() => {
    handler(transcript);
    document
      .querySelector(".QuestionView_question_view_textarea__nlBO4")
      .select();
  }, [transcript]);
  return (
    <div>
      <Grammarly clientId={demoClientId}>
        <GrammarlyEditorPlugin
          config={{
            underlines: "off",
            suggestionCards: "off",
            activation: "immediate",
          }}
          onDocumentStats={(evt) => setWritingState(evt.detail, questionNo)}
          onSessionStats={(evt) => setSessionStats(evt.detail)}
        >
          <textarea
            defaultValue={transcript}
            rows={10}
            className={styles.question_view_textarea}
          ></textarea>
        </GrammarlyEditorPlugin>
        {/* {docStats && <StatsOutput stats={docStats} title="Document Stats" />}
      {sessionStats && (
        <StatsOutput stats={sessionStats} title="Session Stats" />
      )} */}
      </Grammarly>
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="text button group"
          color="warning"
        >
          <Button
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: language,
              })
            }
          >
            Start
          </Button>
          <Button onClick={() => SpeechRecognition.stopListening()}>
            Stop
          </Button>
          <Button onClick={resetTranscript}>Reset</Button>
        </ButtonGroup>
        {listening ? <MicIcon /> : <MicOffIcon color="error" />}
      </Box>
    </div>
  );
};
export default Dictaphone;
