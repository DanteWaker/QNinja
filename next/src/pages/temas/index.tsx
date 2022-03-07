import { Card, CardActionArea, CardContent, Grid, Typography, Button } from "@mui/material";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { EssayTheme } from "../../interfaces/Essay";
import { api } from "../../services/api";
import EnemImg from "../../../public/Enem.jpg";
import Image from "next/image";
import Head from "next/head";

export default function EssayThemesPage() {
  const [essayThemes, setEssayThemes] = useState<EssayTheme[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("theme/");
      setEssayThemes(response.data);
    }

    fetchData();
  }, []);

  function renderEssayTheme(item: EssayTheme) {
    return (
      <Card>
        <Head>
          <title>Temas</title>
        </Head>
        <Image src={EnemImg} alt="imagem do tema" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <CardActionArea>
            <Link href={`/temas/${item.id}`} passHref>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#00A5E0",
                }}
              >
                Enviar
              </Button>
            </Link>
          </CardActionArea>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid style={{ marginTop: 16 }} container spacing={2}>
      {essayThemes.map((item) => {
        return (
          <Grid key={item.id} item xs={3}>
            {renderEssayTheme(item)}
          </Grid>
        );
      })}
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

EssayThemesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Temas">{page}</Layout>;
};
