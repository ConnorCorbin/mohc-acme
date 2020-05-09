import React, { memo } from 'react';

import StyledWrapper from 'button/styles/wrapper';
import StyledButton from 'button/styles/button';

const Button = ({
  buttonText,
  type,
  isDisabled,
  designType,
  onClick,
}) => (
  <StyledWrapper>
    <StyledButton
      type={type}
      disabled={isDisabled}
      designType={designType}
      onClick={onClick}
    >
      {buttonText}
    </StyledButton>
  </StyledWrapper>
);

export default memo(Button);
