import Head from "next/head";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { Container, Link, ThemeProvider, Typography } from "@mui/material";
import { theme, themeAuth } from "../styles/global";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthBanner, AuthLogin, AuthMain } from "../styles/pages/Login";
import NinjaImage from "../../public/ninja.png";
import Logo from "../../public/logo";
import Button from "@mui/material/Button";
import SignUpAlert from "../components/SignUpAlert";
import { useRouter } from "next/router";
import { api } from "../services/api";
import axios from "axios";
import ShurikenImg from "../../public/shuriken";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface SignUpData {
  email: string;
  first_name: string;
  password: string;
  repeatPassword: string;
}

interface SignUpNewData {
  email: string;
  first_name: string;
  password: string;
}

const SignUpPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [statePassword, setStatePassword] = useState<string | boolean>(false);
  const [messagePassword, setMessagePassword] = useState<string | boolean>(false);

  const [stateEmail, setStateEmail] = useState<string | boolean>(false);
  const [messageEmail, setMessageEmail] = useState<string | boolean>(false);

  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // quanto if, meu deus, vou ve se tem como reduzir isso depois

  async function handleSignUp(data: SignUpData) {
    const { first_name, email, password, repeatPassword } = data;
    if (password !== repeatPassword) {
      setStatePassword(true);
      setMessagePassword("As senhas não coincidem");
    } else {
      setStatePassword(false);
      setMessagePassword(false);

      const newData: SignUpNewData = { first_name, email, password };

      // Make the post request
      let response;
      try {
        response = await api.post("users/", newData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // If the error is a AxiosError, then we can get the response
          if (err.response && err.response.status === 400) {
            // If we have a response and the error is Bad Request, then we get the response
            response = err.response;
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      }

      if (response.status === 400) {
        if (response.data.password?.length === 1) {
          setStatePassword(true);
          setMessagePassword(response.data.password[0]);
        } else if (response.data.password?.length === 2) {
          setStatePassword(true);
          setMessagePassword(`${response.data.password[0]} e ${response.data.password[1]}`);
        } else if (response.data.password?.length === 3) {
          setStatePassword(true);
          setMessagePassword(
            `${response.data.password[0]}, ${response.data.password[1]} e ${response.data.password[2]}`
          );
        } else if (response.data.email) {
          if (response.data.email[0] === "Insira um endereço de email válido.") {
            setStateEmail(true);
            setMessageEmail(`Por favor, insira um endereço de email válido.`);
          } else if (response.data.email[0] === "user com este Email já existe.") {
            setStateEmail(true);
            setMessageEmail(`Este e-mail já está cadastrado.`);
          }
        }
      } else {
        setSuccess("Cadastro realizado com sucesso, redirecionando para tela de login.");
        router.push("/login");
      }
    }
  }

  const handleBackPage = () => history.back();

  return (
    <ThemeProvider theme={themeAuth}>
      <AuthMain>
        <Head>
          <title>Cadastro</title>
        </Head>

        <AuthBanner>
          <Box
            minWidth="50%"
            maxWidth="70%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Logo margin="0 0 3rem 0" />

            <Image
              src={NinjaImage}
              alt="Imagem de uma estudante"
              layout="intrinsic"
              objectFit="contain"
            />
          </Box>
        </AuthBanner>

        <AuthLogin>
          <Box
            method="POST"
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(handleSignUp)}
            height="100%"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              ".MuiTypography-h4": {
                fontWeight: "bold",
                fontSize: "2rem",
                color: theme.palette.text.secondary,
              },
              "	.MuiTypography-subtitle1": {
                color: theme.palette.text.secondary,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ShurikenImg width="4rem" color={theme.palette.primary.main} />
              <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
                <Link href="/" color="primary">
                  <KeyboardBackspaceIcon sx={{ marginRight: "0.5rem" }} />
                  Voltar para página inicial
                </Link>
              </Typography>
            </Box>

            <Box>
              <Box sx={{ marginBottom: "3rem" }}>
                <Typography variant="h4" color="info" marginBottom="1rem">
                  Cadastro
                </Typography>
                <Typography variant="subtitle1" color="info">
                  Caso tenha algum problema, por favor, fale com o suporte!
                </Typography>
              </Box>
              {success && <SignUpAlert message={success} />}
              <TextField
                fullWidth
                placeholder="Primeiro Nome"
                focused
                variant="outlined"
                required
                id="name"
                type="text"
                color="info"
                {...register("first_name")}
                sx={{
                  marginBottom: "1.5rem",
                  borderRadius: "5px",
                }}
              />
              <TextField
                error={Boolean(stateEmail)}
                helperText={messageEmail}
                fullWidth
                placeholder="E-mail"
                focused
                variant="outlined"
                required
                id="email"
                type="email"
                color="info"
                // inputProps={{ style: { textTransform: "lowercase" } }}
                {...register("email")}
                sx={{
                  marginBottom: "1.5rem",
                  borderRadius: "5px",
                }}
              />
              <TextField
                error={Boolean(statePassword)}
                helperText={messagePassword}
                fullWidth
                focused
                variant="outlined"
                required
                placeholder="Senha"
                id="password"
                color="info"
                type="password"
                {...register("password")}
                sx={{
                  marginBottom: "1.5rem",
                  borderRadius: "5px",
                }}
              />
              <TextField
                error={Boolean(statePassword)}
                helperText={messagePassword}
                fullWidth
                focused
                variant="outlined"
                required
                placeholder="Digite a senha novamente"
                id="password"
                color="info"
                type="password"
                {...register("repeatPassword")}
                sx={{
                  marginBottom: "1.5rem",
                  borderRadius: "5px",
                }}
              />

              <Typography color="info" marginBottom="1rem">
                <Link href="/change-password">Esqueceu a senha?</Link>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  height: "2.4rem",
                }}
              >
                Cadastrar-se
              </Button>
              <Typography variant="subtitle1" marginTop="1rem">
                Já está cadastrado? Por favor, <Link href="/login">faça login</Link>
              </Typography>
            </Box>
            <Typography variant="subtitle1">
              @2022 Ufal Devs brados - Todos os direitos reservados
            </Typography>
          </Box>
        </AuthLogin>
      </AuthMain>
    </ThemeProvider>
  );
};

export default SignUpPage;
