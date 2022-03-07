import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Essay } from "../../interfaces/Essay";
import { api } from "../../services/api";
import Head from "next/head";

export default function EssayPage() {
  const router = useRouter();
  const { essayId } = router.query;
  const [essay, setEssay] = useState<Essay | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`essay/${essayId}`);
      setEssay(response.data);
    }

    fetchData();
  }, [essayId]);

  return (
    <Grid
      container
      spacing={2}
      style={{
        marginTop: 16,
      }}
    >
      <Head>
        <title>{essay?.theme.name}</title>
      </Head>
      <Grid item xs={12}>
        <h1>Tema: {essay?.theme.name}</h1>
        <p>Autor: {<i>{essay?.author.firstName}</i>}</p>
        <p>Enviada em: {<i>{essay?.createdAt}</i>}</p>
      </Grid>

      <Grid item xs={12} lg={8}>
        {essay && <CardMedia component={"img"} src={essay.image} alt="Imagem da redação" />}
      </Grid>

      <Grid item xs={6} lg={4} sm={12}>
        <Card variant="outlined">
          <CardContent sx={{ textAlign: "center" }}>
            <h2>Notas</h2>
            <List>
              <ListItem key="competence1" disablePadding>
                <Grid container>
                  <Grid xs={6}>
                    <ListItemText primary="Competência 1" />
                  </Grid>
                  <Grid xs={6}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={essay?.correction.competence1}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="competence2" disablePadding>
                <Grid container>
                  <Grid xs={6}>
                    <ListItemText primary="Competência 2" />
                  </Grid>
                  <Grid xs={6}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={essay?.correction.competence2}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="competence3" disablePadding>
                <Grid container>
                  <Grid xs={6}>
                    <ListItemText primary="Competência 3" />
                  </Grid>
                  <Grid xs={6}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={essay?.correction.competence3}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="competence4" disablePadding>
                <Grid container>
                  <Grid xs={6}>
                    <ListItemText primary="Competência 4" />
                  </Grid>
                  <Grid xs={6}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={essay?.correction.competence4}
                    />
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem key="competence5" disablePadding>
                <Grid container>
                  <Grid xs={6}>
                    <ListItemText primary="Competência 5" />
                  </Grid>
                  <Grid xs={6}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={essay?.correction.competence5}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem
                key="totalGrade"
                disablePadding
                sx={{
                  borderColor: "#1976d2",
                  borderStyle: "solid",
                  borderRadius: 1,
                  borderWidth: 2,
                }}
              >
                <Grid container>
                  <Grid xs={6}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={<h1>Total</h1>}
                    ></ListItemText>
                  </Grid>
                  <Grid xs={6}>
                    <ListItemText
                      sx={{ textAlign: "center" }}
                      primary={<h1>{essay?.correction.totalGrade}</h1>}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Grid container sx={{ marginTop: 1 }}>
              <Container sx={{ textAlign: "center", marginBottom: 3 }}>
                <h2>Comentários do Corretor</h2>
              </Container>
              <Container sx={{ textAlign: "left" }}>
                <p>{essay?.correction.textComment}</p>
              </Container>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

EssayPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Tema">{page}</Layout>;
};
