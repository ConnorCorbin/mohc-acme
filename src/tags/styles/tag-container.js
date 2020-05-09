import styled from 'styled-components';

import StyledWrapper from 'button/styles/wrapper';
import StyledButton from 'button/styles/button';

export default styled.div`
  display: flex;
  flex-direction: row;

  ${StyledWrapper} {
    margin-left: 10px;
  }

  ${StyledButton} {
    width: 100px;
    padding: 10px;
  }
`;
