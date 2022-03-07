import { Card, CardContent, Grid, Typography, CardMedia, Avatar, Chip } from "@mui/material";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ReactElement, useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { EssayCorrection } from "../../../interfaces/Essay";
import { api } from "../../../services/api";
import Head from "next/head";
import { Box } from "@mui/system";
import { AuthContext } from "../../../contexts/AuthContext";

type chipsColorInterface =
  | "default"
  | "error"
  | "warning"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | undefined;

export default function EssayThemesPage() {
  const [essays, setEssays] = useState<EssayCorrection[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function history() {
      const response = await api.get("correction/", { params: { corrector: user?.id } });
      const data: EssayCorrection[] = response.data;
      setEssays(data);
    }
    if (user) {
      history();
    }
  }, [user]);

  function renderEssaysCorrector(item: EssayCorrection): JSX.Element {
    const URLImage = item.essay.image;
    const textChip =
      item.status === "PENDING"
        ? "Pendente"
        : item.status === "IN PROGRESS"
        ? "Em progresso"
        : "Finalizado";
    const colorChip: chipsColorInterface =
      item.status === "PENDING" ? "error" : item.status === "IN PROGRESS" ? "warning" : "success";

    return (
      <Card
        sx={{
          cursor: "pointer",
          transition: ".3s ease",
          "&:hover": {
            transform: "scale(0.8)",
            transition: ".3s ease",
          },
        }}
      >
        <Head>
          <title>Corrigir redações</title>
        </Head>
        <CardMedia component="img" height="194" image={URLImage} alt="Paella dish" />
        <CardContent>
          <Box width="100" display="flex" justifyContent="center" alignItems="center">
            <Avatar alt="Avatar do usuário" sx={{ mr: 2, height: "3rem", width: "3rem" }} />
            <Box>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="rgba(110, 110, 110, 0.5)"
                margin="0"
              >
                {item.essay.author.firstName} {item.essay.author.lastName}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                color="rgba(110, 110, 110, 0.5)"
                sx={{ fontSize: "80%" }}
              >
                {item.essay.author.email} {item.essay.author.lastName}
              </Typography>
            </Box>
          </Box>
          <Box
            width="100"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            sx={{ flexDirection: "row", marginTop: "2rem" }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="#2f2f30"
              sx={{ fontWeight: "bold" }}
            >
              {item.essay.theme.name}
            </Typography>

            <Chip label={textChip} color={colorChip} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid style={{ marginTop: 16 }} container spacing={2}>
      {essays.map((item) => {
        return (
          <Grid key={item.id} item xs={3}>
            {renderEssaysCorrector(item)}
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
  return <Layout pageName="Corrigir redações">{page}</Layout>;
};
