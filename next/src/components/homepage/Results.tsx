import React from "react";
import Image from "next/image";

//Images and icons
import imagemEstudanteCard from "../../../public/estudante2.png";

// Material UI
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardActionArea } from "@mui/material";
import { StudentsHeader } from "../../styles/components/HomePage/Results";
import { theme } from "../../styles/global";

export function Results() {
  return (
    <Box
      id="results"
      sx={{
        display: "grid",
        gridTemplateAreas: `
          "head head head"
          "card1 card2 card3"
          `,
        justifyItems: "center",
        padding: "5rem",
        background: theme.palette.primary.main,
      }}
    >
      <StudentsHeader>
        <h2>Nosso resultado</h2>
        <hr />
      </StudentsHeader>
      <Card sx={{ maxWidth: 280, gridArea: "card1" }}>
        <CardActionArea>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={imagemEstudanteCard}
              alt="Imagem de uma estudante"
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
              textAlign="center"
            >
              João José
            </Typography>
            <Typography variant="body2" color="primary.light">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 280, gridArea: "card2" }}>
        <CardActionArea>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={imagemEstudanteCard}
              alt="Imagem de uma estudante"
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
              textAlign="center"
            >
              João José
            </Typography>
            <Typography variant="body2" color="primary.light">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 280, gridArea: "card3" }}>
        <CardActionArea>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={imagemEstudanteCard}
              alt="Imagem de uma estudante"
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
              textAlign="center"
            >
              João José
            </Typography>
            <Typography variant="body2" color="primary.light">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
