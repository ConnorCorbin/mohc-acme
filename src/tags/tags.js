import React, { Fragment } from 'react';

import Label from 'label/label';
import Input from 'input/input';
import Button from 'button/button';

import StyledTagContainer from 'tags/styles/tag-container';

const Tags = ({
  labelText,
  stateName,
  noValidate,
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