import styled from "styled-components";
import { theme } from "../../global";

export const StudentsHeader = styled.header`
  grid-area: head;
  width: 50%;
  color: ${theme.palette.text.primary};

  h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  hr {
    color: ${theme.palette.text.primary};
    opacity: 30%;

    margin-bottom: 2rem;
  }
`;
