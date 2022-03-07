import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, Typography } from "@mui/material";
import { theme, themeAuth } from "../styles/global";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthBanner, AuthLogin, AuthMain } from "../styles/pages/Login";
import NinjaImage from "../../public/ninja.png";
import Logo from "../../public/logo";
import Button from "@mui/material/Button";
import LoginAlert from "../components/LoginAlert";
import { AuthContext } from "../contexts/AuthContext";
import { AxiosResponse } from "axios";

import { ThemeProvider } from "@material-ui/core";
import ShurikenImg from "../../public/shuriken";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface SignInData {
  email: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const [response, setResponse] = useState<AxiosResponse | null>(null);

  async function handleSignIn(data: SignInData) {
    const responseData = await signIn(data);
    setResponse(responseData);
  }

  const handleBackPage = () => history.back();

  return (
    <ThemeProvider theme={themeAuth}>
      <AuthMain>
        <Head>
          <title>Login</title>
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
            onSubmit={handleSubmit(handleSignIn)}
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
                  Login
                </Typography>
                <Typography variant="subtitle1" color="info">
                  Caso tenha algum problema, por favor, fale com o suporte!
                </Typography>
              </Box>
              {response && <LoginAlert authResponse={response} />}
              <TextField
                required
                fullWidth
                focused
                placeholder="Digite o seu e-mail aqui"
                label="E-mail"
                id="email"
                type="email"
                color="info"
                variant="outlined"
                {...register("email")}
                sx={{
                  marginBottom: "1.5rem",
                  marginTop: "1.5rem",
                }}
              />
              <TextField
                required
                fullWidth
                focused
                placeholder="Digite a sua senha aqui"
                label="Senha"
                id="password"
                type="password"
                color="info"
                variant="outlined"
                {...register("password")}
                sx={{
                  marginBottom: "1.5rem",
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
                Entrar
              </Button>
              <Typography variant="subtitle1" marginTop="1rem">
                Não está cadastrado? Por favor, <Link href="/signup">cadastre-se</Link>
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

export default LoginPage;
