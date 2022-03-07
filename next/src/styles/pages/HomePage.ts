import styled from "styled-components";
import { theme } from "../global";
import { lighten } from "polished";

export const LogoContainer = styled.div`
  height: 3rem;
  width: 10rem;

  body {
    background-color: ${theme.palette.primary.main};
  }

  @media screen and (max-width: 899px) {
    display: none;
  }
`;

export const HomeLayout = styled.div`
  background-color: ${lighten(0.02, theme.palette.primary.main)};
`;
