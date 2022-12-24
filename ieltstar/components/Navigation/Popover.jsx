import * as React from "react";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArchiveIcon from "@mui/icons-material/MoveToInbox";
import Link from "next/link";
import { Divider, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const user = props.user;
  console.log(user);

  return (
    <div>
      <Avatar
        alt="USER"
        src={user.picture}
        onClick={handleClick}
        aria-describedby={id}
        variant="contained"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* <div>
        <Typography sx={{ p: 2 }}>Hello, {props.user.nickname}</Typography>
        <a href="/api/auth/logout">
        <Button>Sign Out</Button>
        </a>
        
        </div> */}
        <List>
          <ListItem>
            <ListItemText primary={props.user.nickname} sx={{fontSize: "14px"}}/>
          </ListItem>
          <Divider />
          <ListItem>
            <Button variant="outlined" endIcon={<ExitToAppIcon />} component={Link} href="/api/auth/logout" color="error">
              Logout
            </Button>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
