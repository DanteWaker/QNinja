import Head from "next/head";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ReactElement, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/layout/Layout";
import { parseCookies } from "nookies";
import { Essay } from "../../interfaces/Essay";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { Card, Grid, ListItemButton } from "@mui/material";
import Link from "next/link";

export default function EssaysPage() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const response = await api.get("essay/", { params: { author: user.id } });
      setEssays(response.data);
    }

    fetchData();
  }, [user]);

  return (
    <Grid container spacing={2}>
      <Head>
        <title>Minhas redações</title>
      </Head>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
          <Grid item xs={9}>
            <Card variant="outlined">
              <List>
                {essays.map((item) => {
                  return (
                    <Link key={item.id} href={`/redacoes/${item.id}`} passHref>
                      <ListItem disablePadding>
                        <ListItemButton
                          component="a"
                          href={`/redacao/${item.id}`}
                          style={{ justifyContent: "space-between" }}
                        >
                          <ListItemText primary={item.theme.name} />
                          <ListItemText
                            style={{ color: "green", textAlign: "right" }}
                            primary={item.correction.status}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  );
                })}
                {essays.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Nenhuma redação submetida" />
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Grid>
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

EssaysPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Minhas Redações">{page}</Layout>;
};
