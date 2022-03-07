import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactElement, useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { AuthContext } from "../../contexts/AuthContext";
import { EssayTheme } from "../../interfaces/Essay";
import { api } from "../../services/api";
import { sendForm } from "../../services/requests";
import Head from "next/head";

export default function EssayThemePage() {
  const router = useRouter();
  const { essayThemeId } = router.query;
  const { user } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [essayTheme, setEssayTheme] = useState<EssayTheme | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`theme/${essayThemeId}`);
      setEssayTheme(response.data);
    }

    fetchData();
  }, [essayThemeId]);

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function openTemplateDialog() {
    setTemplateDialogOpen(true);
  }

  function closeTemplateDialog() {
    setTemplateDialogOpen(false);
  }

  function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  }

  function handleImageEssay() {
    if (!user) return;

    const data = {
      theme: essayTheme?.id,
      author: user.id,
      image: imageFile,
    };
    sendForm("post", "essay/", data);
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 10,
      }}
    >
      <Head>
        <title>{essayTheme?.name}</title>
      </Head>
      <h1>{essayTheme?.name}</h1>
      <Box
        sx={{
          marginTop: 5,
        }}
      >
        <h3>Proposta de Redação</h3>
        <Box
          sx={{
            textAlign: "left",
            marginTop: 2,
            paddingLeft: "25%",
            paddingRight: "25%",
          }}
        >
          <h4>
            A partir da leitura dos textos motivadores e com base nos
            conhecimentos construidos ao longo de sua formação, redija um texto
            dissertativo argumentativo em modalidade formal da língua portuguesa
            sobre o tema {essayTheme?.name}. Selecione, organize e relacione, de
            forma coerente e coesa, argumentos e fatos para defesa de seu ponto
            de vista.
          </h4>
        </Box>
      </Box>

      <Box
        style={{
          marginTop: 16,
        }}
      >
        <Box>
          <Grid container spacing={1}>
            <Grid
              item
              xs={6}
              sx={{
                textAlign: "right",
              }}
            >
              <Button variant="outlined" onClick={openDialog}>
                Textos motivadores
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                textAlign: "left",
              }}
            >
              <Button variant="outlined" onClick={openTemplateDialog}>
                Folha de Redação
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid item xs={5}>
          <Dialog
            maxWidth="xl"
            fullWidth={true}
            open={dialogOpen}
            onClose={closeDialog}
          >
            <DialogTitle>Textos motivadores</DialogTitle>
            <DialogContent>
              <object
                data={essayTheme?.themeFile}
                type="application/pdf"
                style={{
                  width: "100%",
                  height: "2000px",
                }}
              ></object>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Fechar</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            maxWidth="xl"
            fullWidth={true}
            open={templateDialogOpen}
            onClose={closeTemplateDialog}
          >
            <DialogTitle>Textos motivadores</DialogTitle>
            <DialogContent>
              <object
                data="https://qninja.s3.sa-east-1.amazonaws.com/media/public/default/folha+de+redacao.pdf"
                type="application/pdf"
                style={{
                  width: "100%",
                  height: "2000px",
                }}
              ></object>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeTemplateDialog}>Fechar</Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Box
          sx={{
            marginTop: 5,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              marginBottom: 2,
            }}
          >
            <Button variant="contained" component="label">
              Escolher arquivo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                hidden
              />
            </Button>
          </Box>

          <Box
            sx={{
              marginBottom: 2,
            }}
          >
            <Button variant="outlined" onClick={handleImageEssay}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
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

EssayThemePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Tema">{page}</Layout>;
};
