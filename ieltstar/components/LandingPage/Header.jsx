import {
  AppBar,
  Typography,
  Link,
  Box,
  Toolbar,
  List,
  IconButton,
  Drawer,
} from "@mui/material";
import React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "../../styles/Landing.module.scss";
import logo from "../../images/logoWithoutName.png";
import Image from "next/image";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

// adding styles for header components
const Header = (props) => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List></List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ marginBottom: "70px" }}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={styles.toolBar}>
            <Image src={logo} alt="Logo" className={styles.smallImage} />
            <Link href="#" underline="none">
              <Typography variant="h5" className={styles.logo}>
                IELTSTAR
              </Typography>
            </Link>

            {matches ? (
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer("right", true)}
                >
                  <MenuIcon className={styles.menuIcon} fontSize="" />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  {list("right")}
                </Drawer>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: "0.1",
                }}
              ></Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;
