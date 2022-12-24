import Box from "@mui/material/Box";
import DefaultTopbar from "../Navigation/DefaultTopbar";
import DefaultDrawer from "../Navigation/DefaultDrawer";
import { useState } from "react";
import DrawerHeader from "../Navigation/DrawerHeader";
import Head from "next/head";

//Default Layout for student page
export default function Default({ children }) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>IELTSTAR - Student</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>
      <Box sx={{ display: "flex" }}>
        <DefaultTopbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <DefaultDrawer open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
}
