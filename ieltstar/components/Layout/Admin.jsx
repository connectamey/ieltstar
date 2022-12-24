import Box from "@mui/material/Box";
import DefaultTopbar from "../Navigation/DefaultTopbar";
import AdminDrawer from "../Navigation/AdminDrawer";
import { useState } from "react";
import DrawerHeader from "../Navigation/DrawerHeader";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useRouter } from "next/router";


//Admin Layout for admin page
export default function Default({ children }) {
  const [open, setOpen] = useState(true);
  const user = useUser().user;
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      //handle log-in or sign-up
      if(user.email !== "admin@gmail.com") {
        router.push("/");
      }
    } else {
      //when user logs-out
      router.push("/landing");
    }
  }, [user]);


  return (
    <>
      <Head>
        <title>IELTSTAR - Admin</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>
      <Box sx={{ display: "flex" }}>
        <DefaultTopbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <AdminDrawer open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
}
