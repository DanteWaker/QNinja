import { Box } from "@mui/material";
import { lighten } from "polished";
import React from "react";
import { theme } from "../../styles/global";

export function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: lighten(0.15, "black"),
        color: theme.palette.text.primary,
        padding: "4rem",
      }}
    >
      <span>Instagram</span>
      <span>Informações</span>
      <span>Informações</span>
      <span>Informações</span>
    </Box>
  );
}
