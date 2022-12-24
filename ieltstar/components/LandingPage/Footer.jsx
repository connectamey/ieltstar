import React from "react";
import { Box, Typography, Link } from "@mui/material";
import styles from "../../styles/Landing.module.scss";

// Adding html and styling for Footer component
const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.footerContainer}>
      <Typography className={styles.footerDate}>HuskyBytes</Typography>
    </Box>
  );
};

export default Footer;
