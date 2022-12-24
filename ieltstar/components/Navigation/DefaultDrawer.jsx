import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DrawerHeader from "./DrawerHeader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PracticeIcon from "@mui/icons-material/Bolt";
import ArchiveIcon from "@mui/icons-material/MoveToInbox";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Link from "next/link";
import { useEffect, useState } from "react";

//drawer syling and theming
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//side drawer for student layout
const DefaultDrawer = ({ open, handleDrawerClose }) => {
  const [selected, setSelected] = useState('dashboard');
  const theme = useTheme();
 
  useEffect(() => {
    const path = window.location.pathname;
    setSelected(path.substring(path.lastIndexOf('/') + 1));
  }, [])

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button component={Link} href="/student/dashboard" selected={selected == 'dashboard'} onClick={() => setSelected('dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
       
        <ListItem button component={Link} href="/student/archive" selected={selected == 'archive'} onClick={() => setSelected('archive')}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItem>
      </List>
      
    </Drawer>
  );
};

export default DefaultDrawer;
