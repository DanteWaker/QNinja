import Head from "next/head";
import type { NextPage } from "next";

import { Banner } from "../components/homepage/Banner";

//Styles
import { theme } from "../styles/global";
import { HomeLayout } from "../styles/pages/HomePage";

// Material UI
import { Qualifications } from "../components/homepage/Qualifications";
import { HomePageNavBar } from "../components/homepage/HomePageNavBar";
import { Results } from "../components/homepage/Results";
import { Prices } from "../components/homepage/Prices";
import { Box } from "@material-ui/core";
import { Footer } from "../components/homepage/Footer";
import { ThemeProvider } from "@material-ui/core";

const HomePage: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>QNinja | Seja um NINJA na redação!</title>
      </Head>
      <HomeLayout id="home">
        <Box
          sx={{
            maxWidth: "xl",
            margin: "0 auto",
          }}
        >
          <HomePageNavBar />

          <Banner />

          <Qualifications />

          <Results />

          <Prices />

          <Footer />
        </Box>
      </HomeLayout>
    </ThemeProvider>
  );
};

export default HomePage;
