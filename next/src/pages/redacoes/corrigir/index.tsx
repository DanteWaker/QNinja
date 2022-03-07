import {
  Box,
  Button,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactElement, useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import EssayCorrectionSuccessDialog from "../../../components/essay/EssayCorrectionSuccessDialog";
import Layout from "../../../components/layout/Layout";
import { Essay } from "../../../interfaces/Essay";
import { api } from "../../../services/api";
import { sendForm } from "../../../services/requests";

export default function CorrectEssayPage() {
  const [essay, setEssay] = useState<Essay | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [queueEmpty, setQueueEmpty] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const getEssay = useCallback(async () => {
    try {
      const response = await api.post("essay/start_correction/");
      setEssay(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If we have a response, and the status code is 404,
        // then we know the correction queue is empty.
        if (error.response && error.response.status === 404) {
          setQueueEmpty(true);
          setTimeout(() => {
            router.push("/redacoes/corrigir/history");
          }, 2000);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }, [router]);

  useEffect(() => {
    async function fetchData() {
      await getEssay();
    }
    fetchData();
  }, [getEssay]);

  async function handleSubmitCorrection(data: any) {
    if (data["audio_comment"].length > 0) {
      data["audio_comment"] = data["audio_comment"][0];
    } else {
      data["audio_comment"] = "";
    }

    await sendForm("post", `correction/${essay?.id}/submit_correction/`, data);
    setSuccessDialogOpen(true);
  }

  function handleCloseSuccessDialog() {
    router.push("/redacoes/corrigir/history");
  }

  async function handleConfirmSuccessDialog() {
    // Reset the form
    reset();

    // Request a new essay to be corrected
    await getEssay();

    // Close the dialog
    setSuccessDialogOpen(false);

    // Scroll to top
    window.scrollTo(0, 0);
  }

  if (queueEmpty) {
    return (
      <Alert
        sx={{
          width: "60%",
          margin: "auto",
          marginTop: "50px",
        }}
        variant="filled"
        severity="warning"
      >
        Não existem mais redações para corrigir. <br />
        Você será redirecionado para a página de histórico de correções.
      </Alert>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      style={{
        marginTop: 16,
      }}
    >
      <Grid item xs={12}>
        <h1>Tema: {essay?.theme.name}</h1>
        <p>Autor: {essay?.author.firstName}</p>
      </Grid>

      <Grid item xs={12}>
        {essay && (
          <CardMedia
            component={"img"}
            src={essay.image}
            alt="Imagem da redação"
          />
        )}
      </Grid>

      <Grid item xs={12} sm={8} md={4}>
        <EssayCorrectionSuccessDialog
          open={successDialogOpen}
          closeFunc={handleCloseSuccessDialog}
          confirmFunc={handleConfirmSuccessDialog}
        />
        <Card variant="outlined">
          <CardContent>
            <h2>Notas</h2>
            <Box
              method="POST"
              component="form"
              autoComplete="off"
              encType="multipart/form-data"
              onSubmit={handleSubmit(handleSubmitCorrection)}
            >
              <ListItem key="competence1" disablePadding>
                <ListItemText primary="competence1: " />
                <TextField
                  required
                  {...register("competence1")}
                  type="number"
                  variant="outlined"
                />
              </ListItem>
              <ListItem key="competence2" disablePadding>
                <ListItemText primary="competence2: " />
                <TextField
                  required
                  {...register("competence2")}
                  type="number"
                  variant="outlined"
                />
              </ListItem>
              <ListItem key="competence3" disablePadding>
                <ListItemText primary="competence3: " />
                <TextField
                  required
                  {...register("competence3")}
                  type="number"
                  variant="outlined"
                />
              </ListItem>
              <ListItem key="competence4" disablePadding>
                <ListItemText primary="competence4: " />
                <TextField
                  required
                  {...register("competence4")}
                  type="number"
                  variant="outlined"
                />
              </ListItem>
              <ListItem key="competence5" disablePadding>
                <ListItemText primary="competence5: " />
                <TextField
                  required
                  {...register("competence5")}
                  type="number"
                  variant="outlined"
                />
              </ListItem>
              <ListItem key="textComment" disablePadding>
                <ListItemText primary="Comentário em texto:" />
                <TextField
                  multiline
                  placeholder="Digite os comentários da correção."
                  variant="outlined"
                  {...register("text_comment")}
                  type="text"
                />
              </ListItem>
              <ListItem key="audioComment" disablePadding>
                <ListItemText primary="Comentário em áudio:" />
                <Input type="file" {...register("audio_comment")} />
              </ListItem>
              <Button type="submit" variant="contained">
                Corrigir redação
              </Button>
            </Box>
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

CorrectEssayPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Tema">{page}</Layout>;
};
