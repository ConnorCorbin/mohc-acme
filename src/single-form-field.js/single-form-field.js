import React, { memo, Fragment } from 'react';

import Label from 'label/label';
import Input from 'input/input';

const SingleFormField = ({
  labelText,
  stateName,
  noValidate,
  onChange,
  hasErrorMessage,
  value,
  errorMessage,
}) => (
  <Fragment>
    <Label labelText={labelText} />
    <Input
      placeholder={labelText}
      type="text"
      name={stateName}
      noValidate={noValidate}
      onChange={onChange}
      hasErrorMessage={hasErrorMessage}
      value={value}
    />
    {errorMessage}
  </Fragment>
);

export default memo(SingleFormField);
