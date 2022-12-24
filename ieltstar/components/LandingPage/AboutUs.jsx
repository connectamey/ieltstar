import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import bestTeams from "../../images/certification.svg";
import Image from "next/image";
import styles from "../../styles/Landing.module.scss";

// Adding html and styling for About component
const AboutUs = () => {
  return (
    <Box className={styles.aboutUsContainer}>
      <Grid container spacing={6} className={styles.gridContainer}>
        <Grid item xs={12} md={5}>
          <Image src={bestTeams} alt="My Team" className={styles.largeImage} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} className={styles.title}>
            Learn anytime and anywhere
          </Typography>
          <Typography className={styles.aboutUsSubtitle}>
            IELTS is a universally accepted English language proficiency test
            that evaluates a candidate's English language skills. This test is
            mainly designed for non-native English speakers who wish to migrate,
            study, or work in dominant English-speaking countries.
          </Typography>
          <Button
            variant="contained"
            className={styles.button}
            sx={{ width: "200px", fontSize: "16px" }}
          >
            CONTACT US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
