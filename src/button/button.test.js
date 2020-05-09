import React from 'react';

import Button from 'button/button';

import StyledButton from 'button/styles/button';

describe('Button', () => {
  let wrapper;
  const getWrapper = ({
    buttonText = 'Nice button text',
    type = 'submit',
    isDisabled = true,
    designType = 'submit',
    onClick,
  } = {}) => shallow(
    <Button
      buttonText={buttonText}
      type={type}
      isDisabled={isDisabled}
      designType={designType}
      onClick={onClick}
    />,
  );

  it('should render component', () => {
    wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it('should render component with correct text', () => {
    wrapper = getWrapper();

    expect(wrapper.find(StyledButton).children().text()).toEqual('Nice button text');
  });

  it('should render component with correct prop values', () => {
    wrapper = getWrapper();

    expect(wrapper.find(StyledButton).props()).toMatchObject({
      type: 'submit',
      disabled: true,
      designType: 'submit',
    });
  });

  it('should execute onClickFunction when StyledButton onClick event is fired', () => {
    const mockFunction = jest.fn();
    wrapper = getWrapper({ onClick: mockFunction });

    expect(mockFunction).not.toHaveBeenCalledWith();
    wrapper.find(StyledButton).simulate('click');
    expect(mockFunction).toHaveBeenCalledWith();
  });
});
