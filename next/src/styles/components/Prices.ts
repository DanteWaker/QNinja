import styled from "styled-components";
import { theme } from "../global";

export const PriceCard = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 30rem;
  max-width: 20rem;

  border-radius: 0.25rem;

  background: white;

  padding: 3rem;
`;

export const PriceCardHeader = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${theme.palette.text.secondary};

  p {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 0.8rem;
  }

  .highlight {
    color: ${theme.palette.text.primary};
  }

  hr {
    width: 100%;
  }
`;

export const PriceCardBody = styled.section`
  h2 {
    text-align: center;
    font-size: 2rem;
    color: ${theme.palette.secondary.main};
    margin-bottom: 1rem;
  }

  p {
    width: 100%;
    margin-bottom: 0.5rem;
    color: ${theme.palette.text.secondary};
  }
`;

export const PriceContainer = styled.div`
  display: flex;
`;
