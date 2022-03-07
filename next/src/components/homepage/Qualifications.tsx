import React from "react";
import { QualificationsContainer } from "../../styles/components/HomePage/Qualifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export function Qualifications() {
  return (
    <QualificationsContainer>
      <section className="result-section">
        <CheckCircleIcon />
        <h2>Fácil de usar</h2>
      </section>
      <section className="result-section">
        <SchoolIcon />
        <h2>Professores qualificados</h2>
      </section>
      <section className="result-section">
        <NewspaperIcon />
        <h2>Temas atualizados</h2>
      </section>
    </QualificationsContainer>
  );
}
