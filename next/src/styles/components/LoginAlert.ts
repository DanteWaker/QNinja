import styled from "styled-components";
import { theme } from "../global";

export const LoginAlertCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 30rem;
  max-width: 20rem;

  border-radius: 0.25rem;

  background: ${theme.palette.background.default};

  padding: 3rem;
`;
