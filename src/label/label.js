import React, { memo } from 'react';

import StyledLabel from 'label/styles/label';

const Label = ({
  labelText
}) => (
  <StyledLabel htmlFor="campaign">{labelText}</StyledLabel>
);

export default memo(Label);
