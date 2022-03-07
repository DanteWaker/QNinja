import { Box } from "@mui/material";
import React from "react";
import { theme } from "../../styles/global";
import PriceComponent from "../PriceComponent";

export function Prices() {
  return (
    <Box
      id="prices"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        padding: "5rem 2rem",
        background: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        textAlign: "center",
      }}
    >
      <Box paddingBottom="5rem">
        <h1>Estamos com os melhores preços do mercado:</h1>
        <p>Nossos planos são voltados para todo tipo de público</p>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        <PriceComponent type="ancor" />
        <PriceComponent type="ancor" />

        <PriceComponent type="main" />
      </Box>
    </Box>
  );
}
