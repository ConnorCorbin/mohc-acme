import React, { Fragment } from 'react';

import Label from 'label/label';
import Input from 'input/input';
import Button from 'button/button';

import StyledTagContainer from 'tags/styles/tag-container';

const Tags = ({
  labelText,
  stateName,
  noValidate,
  value,
  onChangeHandler,
  hasErrorMessage,
  buttonDesignType,
  isButtonDisabled,
  onClickButtonHandler,
  errorMessage,
}) => (
  <Fragment>
    <Label labelText={labelText} />
    <StyledTagContainer>
      <Input
        placeholder={labelText}
        type="text"
        name={stateName}
        value={value}
        noValidate={noValidate}
        onChange={onChangeHandler}
        hasErrorMessage={hasErrorMessage}
      />
      <Button
        buttonText="Add tag"
        designType={buttonDesignType}
        isDisabled={isButtonDisabled}
        onClick={onClickButtonHandler}
        type="button"
      />
    </StyledTagContainer>
    {errorMessage}
  </Fragment>
);

export default Tags;