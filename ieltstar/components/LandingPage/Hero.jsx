import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import myteam from "../../images/online.svg";
import styles from "../../styles/Landing.module.scss";
import Image from "next/image";

const Hero = () => {
  return (
    <Box className={styles.heroBox}>
      <Grid container spacing={6} className={styles.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={styles.title}>
            Free online IELTS practice tests for 2022.
          </Typography>
          <Typography variant="h6" className={styles.subtitle}>
            Familiarize yourself with the test format, test yourself under timed
            conditions, and more! About 60,000 people take an IELTS test every
            week. Learn why our test is the most popular. For Teachers. Types:
            Academic, General Training, Work or Immigration.
          </Typography>
          <Button
            variant="contained"
            className={styles.button}
            sx={{ width: "200px", fontSize: "16px" }}
            href="/api/auth/login"
          >
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <Image
            src={myteam}
            alt="Picture of the author"
            className={styles.largeImage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
