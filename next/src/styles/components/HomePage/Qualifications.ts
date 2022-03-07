import styled from "styled-components";
import { theme } from "../../global";

export const QualificationsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${theme.palette.background.default};
  height: 18rem;

  .result-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 7rem;
    height: 7rem;
    margin-bottom: 1rem;
    color: ${theme.palette.success.light};
  }
`;
