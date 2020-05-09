import React, { memo } from 'react';

import StyledInput from 'input/styles/input';

const Input = ({
  placeholder,
  type,
  name,
  onChange,
  hasErrorMessage,
  list,
  value
}) => (
  <StyledInput
    placeholder={placeholder}
    type={type}
    name={name}
    noValidate
    onChange={onChange}
    hasErrorMessage={hasErrorMessage}
    list={list}
    value={value}
  />
);

export default memo(Input);
