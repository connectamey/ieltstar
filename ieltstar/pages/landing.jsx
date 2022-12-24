import styles from "../styles/Landing.module.scss";
import Hero from "../components/LandingPage/Hero";
import Header from "../components/LandingPage/Header";
import Section from "../components/LandingPage/Section";
import AboutUs from "../components/LandingPage/AboutUs";
import Testimonial from "../components/LandingPage/Testimonial";
import Footer from "../components/LandingPage/Footer";
import Head from "next/head";

const Landing = () => {
  return (
    <>
      <Head>
        <title>IELTSTAR - Student</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>
      <div className={styles.bgWrap}>
        <Header />
        <Hero />
        <Section />
        <AboutUs />
        <Testimonial />
        <Footer />
      </div>
    </>
  );
};
Landing.getLayout = function getLayout(page) {
  return <>{page}</>;
};
export default Landing;
