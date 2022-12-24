import React from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import styles from "../../styles/Landing.module.scss";

// Adding html and styling for Testimonial component
const Testimonial = () => {
  const reviews = [
    {
      id: 1,
      name: "Karl Brighton",
      statement:
        "I find IELTSTAR very useful for helping my students prepare for the Ielts exam. Great site with excellent questions in reading, writing, speaking & vocabulary! ",
      image_url:
        "https://sweta-myteam-website-fm.netlify.app/static/media/avatar-kady.78fc482c.jpg",
      position: "Canada",
    },
    {
      id: 2,
      name: "Krishna Bells",
      statement:
        "I found the IELTSTAR Practice Tests to be a great learning and review tool for people who will be required to take this test in the near future.",
      image_url:
        "https://sweta-myteam-website-fm.netlify.app/static/media/avatar-aiysha.e119a0c1.jpg",
      position: "England",
    },
    {
      id: 3,
      name: "Ben Spiff",
      statement:
        "IELTSTAR is what you need if studying for the exam. Will give you a better understanding of the overall feel of the test which is very important. It has useful practice tests.",
      image_url:
        "https://sweta-myteam-website-fm.netlify.app/static/media/avatar-arthur.098c2e26.jpg",
      position: "USA",
    },
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
      }}
    >
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item sm={12} md={4} key={review.id}>
            <Card className={styles.testimonialCard}>
              <CardContent>
                <Typography className={styles.testimonialStatement}>
                  "{review.statement}"
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    src={review.image_url}
                    size="large"
                    className={styles.avatar}
                  />
                  <Box>
                    <Typography>{review.name}</Typography>
                    <Typography className={styles.testimonialPosition}>
                      {review.position}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonial;
