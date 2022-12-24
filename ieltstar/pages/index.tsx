import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface User {
  user: {
    email: string;
    name: string;
    picture: string;
  };
}

//Handler for login and sign-up and redirecting to admin or student dashboard
const Home = () => {
  const user = useUser().user;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      //redirect to admin if admin
      console.log(user.email);
      if (user.email === "admin@gmail.com") {
        router.push("/admin/exam");
      } else {
        //handle log-in or sign-up
        axios
          .get(`${process.env.API_URL}/students/email/${user.email}`)
          .then((res) => {
            console.log(res);
            if (res.data === null) {
              //create new student
              axios
                .post(`${process.env.API_URL}/students`, {
                  email: user.email,
                  name: user.name,
                  profileURL: user.picture,
                })
                .then((res) => {
                  console.log(res);
                  router.push("/student/dashboard");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              router.push("/student/dashboard");
            }
          });
      }
    } else {
      //when user logs-out
      router.push("/landing");
    }
  }, [user]);

  return (
    <>
      <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};
Home.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
export default Home;
