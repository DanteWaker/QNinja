import styled, { createGlobalStyle } from "styled-components";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#03598C",
      light: "#357aa3",
      dark: "#023e62",
    },
    secondary: {
      main: "#F25C5D",
      light: "#f47c7d",
      dark: "#a94041",
    },
    background: {
      default: "#f0f2f5",
    },
    text: {
      primary: "#fff",
      secondary: "#3b3b3b",
      disabled: "#BDBDBD",
    },
    divider: "rgba(30,30,30,0.12)",
    error: {
      main: "#f44336",
    },
  },
});

export const themeAuth = createTheme({
  palette: {
    primary: {
      main: "#03598C",
      light: "#357aa3",
      dark: "#023e62",
    },
    secondary: {
      main: "#F25C5D",
      light: "#f47c7d",
      dark: "#a94041",
    },
    background: {
      default: "#f0f2f5",
    },
    text: {
      primary: "#023e62",
      secondary: "#686767",
      disabled: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

export const MainContainer = styled.main`
  margin-top: 2.5rem;
`;

export const GlobalStyle = createGlobalStyle`
 * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;

 }

 // * font-size vem por padrão com 16px (funciona bem no desktop)

 html {
     @media (max-width: 1080px) {
         font-size: 93.75%;
     }

     @media (max-width: 720px) {
         font-size: 87.5%;
     }
 }

 body {
     background: ${theme.palette.background.default};
     -webkit-font-smoothing: antialiased;
 }

 body, input, button, textarea {
     font-family: 'Roboto', sans-serif;
     font-weight: 400;
 }

 h1, h2, h3, h4, h5, h6, strong {
     font-weight: 600;
 }

 button {
     cursor: pointer;
 }

 [disabled] {
     cursor: not-allowed;
     opacity: 0.6;
 }
`;
