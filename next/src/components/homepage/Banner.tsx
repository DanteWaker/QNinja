import { Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import {
  BannerContainer,
  BannerImage,
  BannerTitle,
  Circle,
} from "../../styles/components/HomePage/Banner";

import imagemEstudanteBanner from "../../../public/estudante.png";

export function Banner() {
  return (
    <BannerContainer>
      <BannerTitle>
        <h1>
          Venha se tornar um verdadeiro <b>NINJA</b> da <b>REDAÇÃO</b>
        </h1>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="#prices"
        >
          Conheça os planos
        </Button>
      </BannerTitle>
      <BannerImage>
        <Circle />
        <Image
          src={imagemEstudanteBanner}
          alt="Imagem de uma estudante"
          layout="intrinsic"
          objectFit="contain"
        />
      </BannerImage>
    </BannerContainer>
  );
}
