import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import styles from "../../styles/Landing.module.scss";

// Adding html and styling for Section component
const Section = () => {
  const sectionItems = [
    {
      id: 1,
      icon: (
        <AssignmentIcon sx={{ fontSize: 100 }} className={styles.menuIcon} />
      ),
      sentence:
        "Use our free IELTS practice tests to study. Improve your listening, reading, writing and speaking. 2022 updated!",
    },
    {
      id: 2,
      icon: (
        <HistoryToggleOffIcon
          sx={{ fontSize: 100 }}
          className={styles.menuIcon}
        />
      ),
      sentence:
        "Saving your time by doing a short test in our website everyday to track your progress.",
    },
    {
      id: 3,
      icon: (
        <PaidOutlinedIcon sx={{ fontSize: 100 }} className={styles.menuIcon} />
      ),
      sentence:
        "Learn from the best and most effective IELTS practice test material for Listening, Reading, Writing, and Speaking without worrying about your pockets.    ",
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: "400px" }}>
      <Grid container className={styles.sectionGridContainer}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            className={styles.sectionGridItem}
          >
            {item.icon}
            <Typography>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
