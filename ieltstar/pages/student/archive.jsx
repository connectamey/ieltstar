import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ExamCard from "../../components/Student/Archive/ExamCard";
import AOS from "aos";
import "aos/dist/aos.css";

// Archive Page for Student to see all exams and tests
const archive = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init({
      once: true,
    });
    let endpoints = [
      `${process.env.API_URL}/exams`,
      `${process.env.API_URL}/tests`,
    ];
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((data) => {
      const exams = data[0].data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const tests = data[1].data;
      exams.forEach((exam) => {
        exam["test"] = tests.filter((test) => test.examId === exam._id);
      });
      //tests in exam by category
      exams.forEach((exam) => {
        exam["reading"] = exam.test
          .filter((test) => test.category === "Reading")
          .map((r) => ({ section: r.section }))
          .sort((a, b) => a.section - b.section);
        exam["listening"] = exam.test
          .filter((test) => test.category === "Listening")
          .map((r) => ({ section: r.section }))
          .sort((a, b) => a.section - b.section);
        exam["writing"] = exam.test
          .filter((test) => test.category === "Writing")
          .map((r) => ({ section: r.section }))
          .sort((a, b) => a.section - b.section);
        exam["speaking"] = exam.test
          .filter((test) => test.category === "Speaking")
          .map((r) => ({ section: r.section }))
          .sort((a, b) => a.section - b.section);
        if (
          !exam["reading"].length ||
          !exam["listening"].length ||
          !exam["writing"].length ||
          !exam["speaking"].length
        ) {
          exam["completed"] = false;
        }
        else {
          exam["completed"] = true;
        }
      });

      setData(exams);
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Select any of the test to get started!
      </Typography>
      <Grid container spacing={3}>
        {data.map((exam, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            data-aos="fade-in"
            data-aos-delay={150 * index}
            key={exam._id}
          >
            <ExamCard exam={exam} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default archive;
