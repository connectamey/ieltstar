import { Typography, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Iconify from "../../components/Iconify";
import AOS from "aos";
import "aos/dist/aos.css";
import AppWidgetSummary from "../../components/Student/Dashboard/Summary";
import SectionWiseComparisonChart from "../../components/Student/Dashboard/SectionWiseComparisonChart";
import Leaderboard from "../../components/Student/Dashboard/Leaderboard";
import TestTimeline from "../../components/Student/Dashboard/TestTimeline";
import SuggestedStudyMaterial from "../../components/Student/Dashboard/SuggestedStudyMaterial";
import BoltIcon from "@mui/icons-material/Bolt";
import Box from "@mui/material/Box";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

// Dashboard Page for Student to see all stats and leaderboard
const dashboard = () => {
  const user = useUser().user;
  const [userData, setUserData] = useState({});
  const [summary, setSummary] = useState({
    reading: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
  });
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.API_URL}/students/email/${user.email}`)
        .then((user) => {
          setUserData(user.data);
          user.data.testHistory.forEach((test) => {
            if (test.testType === "Reading")
              setSummary((prev) => ({
                ...prev,
                reading: prev.reading + test.score,
              }));
            if (test.testType === "Listening")
              setSummary((prev) => ({
                ...prev,
                listening: prev.listening + test.score,
              }));
            if (test.testType === "Writing")
              setSummary((prev) => ({
                ...prev,
                writing: prev.writing + test.score,
              }));
            if (test.testType === "Speaking")
              setSummary((prev) => ({
                ...prev,
                speaking: prev.speaking + test.score,
              }));
          });
          //average the sores
          setSummary((prev) => {
            const readingTests = user.data.testHistory.filter(
              (test) => test.testType === "Reading"
            ).length
              ? user.data.testHistory.filter(
                  (test) => test.testType === "Reading"
                ).length
              : 1;
            const listeningTests = user.data.testHistory.filter(
              (test) => test.testType === "Listening"
            ).length
              ? user.data.testHistory.filter(
                  (test) => test.testType === "Listening"
                ).length
              : 1;
            const writingTests = user.data.testHistory.filter(
              (test) => test.testType === "Writing"
            ).length
              ? user.data.testHistory.filter(
                  (test) => test.testType === "Writing"
                ).length
              : 1;
            const speakingTests = user.data.testHistory.filter(
              (test) => test.testType === "Speaking"
            ).length
              ? user.data.testHistory.filter(
                  (test) => test.testType === "Speaking"
                ).length
              : 1;

            return {
              reading: Math.round((prev.reading / readingTests) * 2) / 2,
              listening: Math.round((prev.listening / listeningTests) * 2) / 2,
              writing: Math.round((prev.writing / writingTests) * 2) / 2,
              speaking: Math.round((prev.speaking / speakingTests) * 2) / 2,
            };
          });

          //timeline
          const examIds = [
            ...new Set(user.data.testHistory.map((test) => test.examId)),
          ];

          axios
            .all(
              examIds.map((examId) =>
                axios.get(`${process.env.API_URL}/exams/${examId}`)
              )
            )
            .then((data) => {
              console.log(data.map((exam) => exam.data).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5))
              setTimeline(data.map((exam) => exam.data).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5));
            });
        });
    }
  }, [user]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
        <Typography variant="h4" sx={{}}>
          Hi, Welcome
        </Typography>
        <BoltIcon fontSize="large" color="warning" />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} data-aos="fade-up">
          <AppWidgetSummary
            title="Reading"
            total={summary.reading}
            color="success"
            icon={"fluent-mdl2:reading-mode"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <AppWidgetSummary
            title="Listening"
            total={summary.listening}
            color="info"
            icon={"grommet-icons:assist-listening"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <AppWidgetSummary
            title="Writing"
            total={summary.writing}
            color="warning"
            icon={"icon-park-outline:writing-fluently"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <AppWidgetSummary
            title="Speaking"
            total={summary.speaking}
            color="error"
            icon={"iconoir:mic-speaking"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={8}
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <SectionWiseComparisonChart
            title="Section Wise Comparison"
            subheader="This is a comparison of your performance in each section from all the tests you have taken"
            chartLabels={[
              "01/01/2003",
              "02/01/2003",
              "03/01/2003",
              "04/01/2003",
              "05/01/2003"
            ]}
            chartData={[
              {
                name: "Reading",
                type: "area",
                fill: "gradient",
                data: [5, 7, 6, 8, 9],
              },
              {
                name: "Listening",
                type: "area",
                fill: "gradient",
                data: [8, 6.5, 4, 8, 9],
              },
              {
                name: "Writing",
                type: "area",
                fill: "gradient",
                data: [6, 4.5, 8, 6, 9],
              },
              {
                name: "Speaking",
                type: "area",
                fill: "gradient",
                data: [5, 8, 4, 7, 6],
              },
            ]}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          data-aos="fade-up"
          data-aos-delay="900"
        >
          <TestTimeline
            title="Recent Tests Taken"
            list={timeline.map((item, index) => ({
              id: index,
              title: item.title,
              type: `order${index + 1}`,
              category: item.type,
              time: new Date(item.date).toLocaleDateString(),
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8} data-aos="fade-in">
          <Leaderboard
            title="Leaderboard"
            subheader="Top 5 students on our platform"
            list={[...Array(5)].map((_, index) => ({
              id: index,
              title: ["Amey Bansod", "Keerthana Zues", "Saloni Chaaku", "Rahul Kumar", "Santosh Biden"][index],
              description: ["General", "Academic", "General", "Academic", "Academic"][index],
              image: `/avatars/avatar_${index + 1}.jpg`,
              proficiency: 8.5 - index,
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} data-aos="fade-in">
          <SuggestedStudyMaterial
            title="Study Material"
            subheader="Handpicked recommendations for you"
            list={[
              {
                name: "Reading",
                value: "Youtube",
                icon: (
                  <Iconify icon={"uit:youtube"} color="#1877F2" width={32} />
                ),
              },
              {
                name: "Listening",
                value: "BYJU",
                icon: (
                  <Iconify
                    icon={"simple-icons:byjus"}
                    color="#DF3E30"
                    width={32}
                  />
                ),
              },
              {
                name: "Speaking",
                value: "Udemy",
                icon: (
                  <Iconify
                    icon={"logos:udemy-icon"}
                    color="#006097"
                    width={32}
                  />
                ),
              },
              {
                name: "Writing",
                value: "Coursera",
                icon: (
                  <Iconify
                    icon={"academicons:coursera-square"}
                    color="#1C9CEA"
                    width={32}
                  />
                ),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default dashboard;
