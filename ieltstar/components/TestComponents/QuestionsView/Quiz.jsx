import "regenerator-runtime/runtime";
import Dictaphone from "./SpeechToText";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { Component, use, useEffect, useState, React } from "react";
import { Divider, MobileStepper } from "@mui/material";
import Button from "@mui/material/Button";
import Replay from "@mui/icons-material/Replay";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import styles from "../../../styles/quizstyles/QuestionView.module.scss";
import paragraphStyles from "../../../styles/quizstyles/Paragraph.module.scss";

let quiz_instructions = "";
let parsedQuestionSource = "";
let questionCategory = "";
let demoClientId = "client_9m1fYK3MPQxwKsib5CxtpB";

let demoText = {
  textarea: ``,
};
//Grammarly output of suggestions
const StatsOutput = ({ title, stats }) => (
  <section>
    <h3>{title}</h3>
    <pre>{JSON.stringify(stats, null, 2)}</pre>
  </section>
);

//Grammarly text analysis component
export const Editors = ({questionNo, setWritingState}) => {
  // const [grammarlyConfig, setGrammarlyConfig] = useState({ underlines: "on", suggestionCards: "on" })
  const [docStats, setDocStats] = useState();
  const [sessionStats, setSessionStats] = useState();

  return (
    <Grammarly clientId={demoClientId}>
      <GrammarlyEditorPlugin
        config={{ underlines: "off", suggestionCards: "off" }}
        onDocumentStats={(evt) => setWritingState(evt.detail, questionNo)}
        onSessionStats={(evt) => setSessionStats(evt.detail)}
      >
        <textarea
          defaultValue={demoText.textarea}
          rows={10}
          className={styles.question_view_textarea}
        ></textarea>
      </GrammarlyEditorPlugin>
      {/* {docStats && <StatsOutput stats={docStats} title="Document Stats" />}
      {sessionStats && (
        <StatsOutput stats={sessionStats} title="Session Stats" />
      )} */}
    </Grammarly>
  );
};
class Quiz extends Component {
  componentWillReceiveProps(nextProps) {
    let test = nextProps.test;
    if (Object.keys(test).length === 0) {
      test = {
        instruction: "",
        questions: [],
        source: "",
        category: "",
      };
    }
    const questionsfromdb = test;
    quiz_instructions = questionsfromdb.instruction;
    let questions = questionsfromdb.questions;
    parsedQuestionSource = questionsfromdb.source;
    questionCategory = questionsfromdb.category;

    if (questionCategory === "Listening") {
      parsedQuestionSource = `
                <h3>Listen to the instructions for each part of this section carefully. Answer all the questions.</h3>
                <audio controls>
  <source 
  src="${questionsfromdb.source}"
  
  type="audio/mpeg">
Your browser does not support the audio element.
</audio>`;
    }

    //Mapping questions with answers

    questions = questions.map((question, index) => ({
      questionId: question._id,
      questionTitle: question.title,
      questionOptions: question.options.map((option) => ({
        que_options: option,
      })),
      correctAnswer: question.answer,
    }));
    this.setState({ questionsfromdb: questions });
  }
  constructor(props) {
    super(props);

    this.state = {
      speakingtext: "",
      writingtext: "",
      activeStep: 0,
      booleanonsubmit: false,
      Total: 0,
      open: false,
      catchmsg: "",
      errormsg: "",
      questionsfromdb: [],
      writingScores: [0, 0],
    };
  }

  //To convert speech to text
  handleSpeechText = (text) => this.setState({ speakingtext: text });
  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };
//Back navigation
  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };
//If input is selected then check if answer is correct or not
  onInputChange = (e) => {
    if (questionCategory === "Writing") {
      this.setState({ writingtext: e.target.value });
    }
    const { questionsfromdb } = this.state;

    const nexState = questionsfromdb.map((card) => {
      if (card.questionId !== e.target.name) return card;
      return {
        ...card,
        questionOptions: card.questionOptions.map((opt) => {
          const checked = opt.que_options === e.target.value;
          return {
            ...opt,
            selected: checked,
          };
        }),
      };
    });
    this.setState({ questionsfromdb: nexState });
  };

  setWritingStateHandler = (writingState, questionNo) => {
    let array = this.state.writingScores;
    array[questionNo] = writingState;
    this.setState({writingScores: array})
  }
//After submitting the answers of every section
  onsubmit = () => {

    //Calculates score for reading & listening
   if(this.props.test.category === "Listening" || this.props.test.category === "Reading"){
    axios.post(`${process.env.API_URL}/students/${this.props.user}/testHistory`, {
      testType: this.props.test.category,
      testId: this.props.test._id,
      section: this.props.test.section,
      examId: this.props.test.examId,
      score: 0,
      userResponse: this.state.questionsfromdb
    }).then(()=> {
      this.props.getNextTest();
    })
   }
   else if(this.props.test.category === "Writing" || this.props.test.category === "Speaking"){
    axios.post(`${process.env.API_URL}/students/${this.props.user}/testHistory`, {
      testType: this.props.test.category,
      testId: this.props.test._id,
      section: this.props.test.section,
      examId: this.props.test.examId,
      score: this.state.writingScores})
      .then(()=> {
        this.props.getNextTest();
      })
   } 
    // this.props.getNextTest();
    let list = this.state.questionsfromdb;
    let count = 0;
    let notattempcount = 0;

    list.map((item, key) => {
      item.questionOptions.map((anslist, key) => {
        //  console.log("anslist.selected===>",anslist.selected)
        if (anslist.selected === true) {
          if (anslist.que_options === item.correctAnswer) {
            //   console.log("===>",anslist.que_options,item.ans)
            count = count + 1;
          }
        } else {
          notattempcount = notattempcount + 1;
        }
      });
    });

    if (notattempcount <= 24 && notattempcount > 16) {
      this.setState({ booleanonsubmit: false, Total: count });
      this.setState({
        catchmsg: "Please attempt all questions",
        errormsg: "error",
        open: true,
      });
    } else {
      // this.setState({ booleanonsubmit: true, Total: count });
      this.setState({
      
          speakingtext: "",
          writingtext: "",
          activeStep: 0,
          booleanonsubmit: false,
          Total: 0,
          open: false,
          catchmsg: "",
          errormsg: "",
          questionsfromdb: [],
         
        
      })
      
    }
  };
//Snackbar warnings
  Snackbarrender = () => {
    return this.state.open ? (
      <Snackbar
        open={this.state.open}
        autoHideDuration={5000}
        onClose={this.handleClose}
        style={{ marginTop: "0px", width: "100%" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={this.handleClose}
          severity={this.state.errormsg}
        >
          {this.state.catchmsg}
        </Alert>
      </Snackbar>
    ) : null;
  };

  render() {
    return (
      <div>
        {this.state.booleanonsubmit ? (
          <div>
            <h2>
              {" "}
              The score is {this.state.Total} Out Of{" "}
              {this.state.questionsfromdb.length}{" "}
            </h2>
            <Button
              onClick={() => {
                this.setState({
                  booleanonsubmit: false,
                  activeStep: 0,
                  questionsfromdb: questionsfromdb,
                  Total: 0,
                });
              }}
            >
              {" "}
              <Replay /> Try again{" "}
            </Button>
          </div>
        ) : (
          <div>
            {this.state.questionsfromdb.map((item, index) => {
              if (Math.abs(this.state.activeStep - index) <= 0) {
                if (questionCategory === "Writing")
                  return (
                    <div className={styles.question_view_main_grid_2_columns}>
                      <section className={styles.question_view_card}>
                        <div
                          className={paragraphStyles.Paragraph_content}
                          dangerouslySetInnerHTML={{
                            __html: parsedQuestionSource,
                          }}
                        />
                          <div className={styles.Quiz_que}>
                            {item.questionTitle}
                          </div>
                      </section>
                      <section className={styles.question_view_card}>
                        <div className={styles.Quiz_container_display}>
                          <h3>{quiz_instructions}</h3>
                          <Editors questionNo={index} setWritingState={this.setWritingStateHandler}/>                        
                        </div>
                      </section>
                    </div>
                  );
                else if (questionCategory === "Speaking")
                  return (
                    <div className={styles.question_view_main_grid_2_columns}>
                      <section className={styles.question_view_card}>
                        <div
                          className={paragraphStyles.Paragraph_content}
                          dangerouslySetInnerHTML={{
                            __html: parsedQuestionSource,
                          }}
                        />
                      </section>
                      <section className={styles.question_view_card}>
                        <div className={styles.Quiz_container_display}>
                          <h3>{quiz_instructions}</h3>
                          <Dictaphone handler={this.handleSpeechText} questionNo={index} setWritingState={this.setWritingStateHandler}/>
                          <div className={styles.Quiz_que}>
                            {item.questionTitle}
                          </div>
                        </div>
                      </section>
                    </div>
                  );
                else if (questionCategory === "Reading" || questionCategory === "Listening")
                  return (
                    <div className={styles.question_view_main_grid_2_columns}>
                      <section className={styles.question_view_card}>
                        <div
                          className={paragraphStyles.Paragraph_content}
                          dangerouslySetInnerHTML={{
                            __html: parsedQuestionSource,
                          }}
                        />
                      </section>
                      <section className={styles.question_view_card}>
                        <div className={styles.Quiz_container_display}>
                          <h3>{quiz_instructions}</h3>
                          <Divider />
                          <br />
                          <div className={styles.Quiz_que}>
                            {item.questionTitle}
                            <br />
                            <br />
                          </div>

                          <div className={styles.Quiz_options}></div>
                          {item.questionOptions.map(
                            (correctAnswer, index_ans) => {
                              index_ans = index_ans + 1;
                              return (
                                <div
                                  key={index_ans}
                                  className={styles.Quiz_multiple_options}
                                >
                                  <input
                                    className={styles.Quiz_radio_input}
                                    key={index_ans}
                                    type="radio"
                                    name={item.questionId}
                                    value={correctAnswer.que_options}
                                    checked={!!correctAnswer.selected}
                                    onChange={this.onInputChange}
                                  />
                                   &nbsp;&nbsp;{correctAnswer.que_options}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </section>
                    </div>
                  );
              } else {
                return null;
              }
            })}
            <div className="Quiz-MobileStepper">
              <MobileStepper
                variant="dots"
                steps={this.state.questionsfromdb.length}
                position="static"
                activeStep={this.state.activeStep}
                nextButton={
                  this.state.activeStep ===
                  this.state.questionsfromdb.length - 1 ? (
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      onClick={this.onsubmit}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      onClick={this.handleNext}
                      disabled={
                        this.state.activeStep ===
                        this.state.questionsfromdb.length
                      }
                    >
                      Next
                    </Button>
                  )
                }
                backButton={
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={this.handleBack}
                    disabled={this.state.activeStep === 0}
                  >
                    Back
                  </Button>
                }
              />
            </div>
          </div>
        )}
        {this.Snackbarrender()}
      </div>
    );
  }
}

export default Quiz;
