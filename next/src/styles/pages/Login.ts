import styled from "styled-components";
import { theme } from "../global";

export const AuthMain = styled.main`
  display: flex;
  flex-direction: row;
`;

export const AuthBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  padding: 4rem;

  min-height: 100vh;
  width: 60%;

  background-color: ${theme.palette.primary.main};
`;

export const AuthLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 4rem;

  width: 40%;
`;
