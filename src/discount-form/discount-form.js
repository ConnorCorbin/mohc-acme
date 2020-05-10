import React, { Component, Fragment } from 'react';

import Button from 'button/button';
import DiscountType from 'discount-type/discount-type';
import SingleFormField from 'single-form-field.js/single-form-field';
import Tags from 'tags/tags';

import StyledForm from 'discount-form/styles/form';
import StyledContainer from 'discount-form/styles/container';
import StyledErrorMessage from 'discount-form/styles/error-message';
import StyledPreview from 'discount-form/styles/preview';

class DiscountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
      campaign: '',
      tagText: '',
      preTagsStorage: [],
      tags: [],
      discountType: '',
      shortMessage: '',
      mediumMessage: '',
      longMessage: '',
      formErrors: {
        campaign: '',
        tagText: '',
        discountType: '',
        shortMessage: '',
        mediumMessage: '',
        longMessage: '',
      }
    };
  }

  hasErrorMessage = (stateName) => !!this.state.formErrors[stateName];

  getCampainsPreview = () => {
    const discountCampaigns = {
      'discount-campaigns': this.state.campaigns,
    };

    return (
      <StyledPreview>
        {JSON.stringify(discountCampaigns, null, 2)}
      </StyledPreview>
    );
  };

  getErrorMessage = (stateName) => {
    const errorMessage = this.state.formErrors[stateName];

    if (!errorMessage) return null;

    return (
      <StyledErrorMessage>
        {errorMessage}
      </StyledErrorMessage>
    );
  };

  handleMaximumCharacters = (inputValue, formErrors, stateName) => {
    const maximumCharacterMap = {
      campaign: 30,
      shortMessage: 15,
      mediumMessage: 30,
      longMessage: 60,
      tagText: 30,
    };

    const maximumCharacters = maximumCharacterMap[stateName];
    const isCharacterLengthValid = inputValue.length <= maximumCharacters;

    formErrors[stateName] = isCharacterLengthValid
      ? ''
      : `Maximum of ${maximumCharacters} characaters allowed.`;
  };

  handlePermittedValues = (inputValue, formErrors, stateName) => {
    const messageRegex = '[^A-Za-z0-9-%£ ]';
    const defaultRegex = '[^A-Za-z0-9-]';

    const permittedValuesMap = {
      campaign: defaultRegex,
      shortMessage: messageRegex,
      mediumMessage: messageRegex,
      longMessage: messageRegex,
      discountType: defaultRegex,
      tagText: defaultRegex,
    };

    if (formErrors[stateName]) return null;
    const hasInvalidCharacters = RegExp(permittedValuesMap[stateName]).test(inputValue);

    formErrors[stateName] = hasInvalidCharacters
      ? "Contains invalid characters; only 'A-Z', 'a-z', '0-9' and '-' are allowed."
      : '';
  };

  handleDiscountTypes = (inputValue, formErrors, stateName) => {
    const permittedValues = ['BOGOF', 'BOGSHP', '3FOR2'];
    const permittedRegex = ['B([0-9]+)G([0-9]+)', '([0-9]+):FOR:([0-9]+)'];

    const isPermittedValue = permittedValues.includes(inputValue);
    const isPermittedRegex = permittedRegex.some(regex => 
      RegExp(regex).test(inputValue));
    
    const hasValidDiscountType = isPermittedValue || isPermittedRegex;

    formErrors[stateName] = hasValidDiscountType
      ? ''
      : 'Invalid discount type; ensure discount type matches allowed patterns.';
  };

  discountOnChangeHandler = (inputValue, formErrors, stateName) => this.handleDiscountTypes(inputValue, formErrors, stateName);

  defaultOnChangeHandler = (inputValue, formErrors, stateName) => {
    const stateNameMap = {
      campaign: 'campaign',
      shortMessage: 'shortMessage',
      mediumMessage: 'mediumMessage',
      longMessage: 'longMessage',
      tagText: 'tagText',
    };

    const actualStateName = stateNameMap[stateName];

    this.handleMaximumCharacters(inputValue, formErrors, actualStateName);
    this.handlePermittedValues(inputValue, formErrors, actualStateName);
  };

  onChangeHandler = () => (event) => {
    const { target: { name: stateName, value: inputValue } } = event;

    let formErrors = { ...this.state.formErrors };
    const isDiscountTypeHandler = stateName === 'discountType';

    if (isDiscountTypeHandler) {
      this.discountOnChangeHandler(inputValue, formErrors, stateName);
    };

    if (!isDiscountTypeHandler) {
      this.defaultOnChangeHandler(inputValue, formErrors, stateName);
    };
    
    this.setState({ formErrors, [stateName]: inputValue });
  };

  isFormValid = () => {
    const {
      formErrors,
      campaigns,
      tagText,
      tags,
      preTagsStorage,
      ...formValues
    } = this.state;

    let isFormValid = true;

    // Validate that there are no form errors
    Object.values(formErrors).forEach(value => value.length && (
      isFormValid = false
    ));

    // Validate that the form was filled out
    Object.values(formValues).forEach(value => !value && (
      isFormValid = false
    ));

    //Validate preTagsStorage has value
    if (!Array.isArray(preTagsStorage) || !preTagsStorage.length) {
      isFormValid = false
    };

    return isFormValid;
  };

  getDiscountType = () => {
    const stateName = 'discountType';
    const labelText = 'Discount type';

    return (
      <StyledContainer>
        <DiscountType
          labelText={labelText}
          stateName={stateName}
          noValidate={true}
          onChange={this.onChangeHandler()}
          hasErrorMessage={this.hasErrorMessage(stateName)}
          listName="discount-type-options"
          value={this.state[stateName]}
          errorMessage={this.getErrorMessage(stateName)}
        />
      </StyledContainer>
    );
  };

  getSimpleFields = () => {
    const simpleFieldsMap = [
      ['campaign', 'Campaign'],
      ['shortMessage', 'Short message'],
      ['mediumMessage', 'Medium message'],
      ['longMessage', 'Long message'],
    ];

    return simpleFieldsMap.map(([stateName, labelText], index) => (
      <StyledContainer key={stateName + index}>
        <SingleFormField
          labelText={labelText}
          stateName={stateName}
          noValidate={true}
          onChange={this.onChangeHandler()}
          hasErrorMessage={this.hasErrorMessage(stateName)}
          value={this.state[stateName]}
          errorMessage={this.getErrorMessage(stateName)}
        />
      </StyledContainer>
    ));
  };

  getTags = () => {
    const { tagText, formErrors: { tagText: tagTextError} } = this.state;

    const labelText = 'Tags';
    const stateName = 'tagText';

    const isButtonDisabled = !tagText || tagTextError;
    const buttonDesignType = tagText && !tagTextError
      ? 'submit'
      : 'disabled';

    const tagOnChangeHandler = () => () => this.setState(prevState => ({
      preTagsStorage: [...prevState.preTagsStorage, this.state.tagText],
      tagText: ''
    }));

    return (
      <StyledContainer>
        <Tags
        labelText={labelText}
        stateName={stateName}
        noValidate={true}
        onChangeHandler={this.onChangeHandler()}
        hasErrorMessage={this.hasErrorMessage(stateName)}
        buttonDesignType={buttonDesignType}
        isButtonDisabled={isButtonDisabled}
        value={this.state[stateName]}
        onClickButtonHandler={tagOnChangeHandler()}
        errorMessage={this.getErrorMessage(stateName)}
        />
      </StyledContainer>
    );
  };

  handleSubmit = () => (event) => {
    event.preventDefault();

    if (this.isFormValid()) {
      const {
        campaign,
        preTagsStorage,
        shortMessage,
        mediumMessage,
        longMessage,
        discountType,
      } = this.state;
  
      const discount = {
        name: campaign,
        discount: discountType,
        tags: preTagsStorage,
        'short-message': shortMessage,
        'med-message': mediumMessage,
        'long-message': longMessage,
      };
  
      const resetFormStateValues = {
        campaign: '',
        preTagsStorage: [],
        discountType: '',
        shortMessage: '',
        mediumMessage: '',
        longMessage: '',
      };
  
      this.setState(prevState => ({
        campaigns: [...prevState.campaigns, discount],
        ...resetFormStateValues,
      }));
    };

    return null;
  };

  getFormButton = () => {
    const isFormValid = this.isFormValid();
    const isDisabled = !isFormValid
    const designType = isFormValid
      ? 'submit'
      : 'disabled';

    return (
      <Button
        buttonText="Add discount"
        type="submit"
        isDisabled={isDisabled}
        designType={designType}
      />
    );
  };

  getForm = () => (
    <StyledForm onSubmit={this.handleSubmit()} autoComplete="off">
      {this.getSimpleFields()}
      {this.getDiscountType()}
      {this.getTags()}
      {this.getFormButton()}
    </StyledForm>
  );

  render() {
    return (
      <Fragment>
        {this.getForm()}
        {this.getCampainsPreview()}
      </Fragment>
    );
  };  
};

export default DiscountForm;
