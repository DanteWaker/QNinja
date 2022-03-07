import { Button } from "@mui/material";
import React from "react";
import { PriceCard, PriceCardBody, PriceCardHeader } from "../styles/components/Prices";

interface PriceData {
  type: string;
}

export default function PriceComponent(props: PriceData) {
  const { type } = props;

  if (type === "main") {
    return (
      <PriceCard>
        <PriceCardHeader>
          <h1>Teste grátis</h1>
          <p>1 redação</p>
          <p className="highlight">Sem prazo para acabar</p>
          <hr />
        </PriceCardHeader>

        <PriceCardBody>
          <h2>R$ 15,00</h2>
          <p>1 correção com 2 professores</p>
        </PriceCardBody>

        <Button
          variant="contained"
          size="large"
          sx={{
            fontSize: "1rem",
            backgroundColor: "#00A5E0",
          }}
        >
          <b>Compre agora</b>
        </Button>
      </PriceCard>
    );
  } else {
    return (
      <PriceCard>
        <PriceCardHeader>
          <h1>Teste grátis</h1>
          <p>1 redação</p>
          <p className="highlight">Sem prazo para acabar</p>
          <hr />
        </PriceCardHeader>

        <PriceCardBody>
          <h2>R$ 15,00</h2>
          <p>1 correção com 2 professores</p>
        </PriceCardBody>

        <Button
          variant="contained"
          // color="secondary"
          size="large"
          sx={{
            fontSize: "1rem",
            backgroundColor: "#00A5E0"
          }}
        >
          <b>Compre agora</b>
        </Button>
      </PriceCard>
    );
  }
}
