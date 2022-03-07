import styled from "styled-components";
import { theme } from "../../global";

export const BannerContainer = styled.section`
  display: flex;
  height: 30rem;
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  background-color: ${theme.palette.primary.main};
`;

export const BannerImage = styled.div`
  display: flex;
  position: relative;
  width: 50%;
`;

export const BannerTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 60%;
  margin-top: auto;
  margin-bottom: auto;
  color: ${theme.palette.text.primary};

  b {
    color: ${theme.palette.secondary.main};
  }

  h1 {
    text-align: center;
    font-size: 3.4rem;
    min-height: 10rem;
    max-height: 15rem;
  }
`;

export const Circle = styled.div`
  position: absolute;
  background-color: ${theme.palette.primary.light};
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;
