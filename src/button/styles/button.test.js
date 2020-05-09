import React from 'react';

import StyledButton from 'button/styles/button';

const modifier = ':hover';
let wrapper;

describe('Background color', () => {
  it('should render StyledButton with correct background color when designType value is submitted', () => {
    wrapper = shallow(<StyledButton designType="submit" />);

    expect(wrapper).toHaveStyleRule('background', '#b8f28b');
  });

  it('should render StyledButton with correct background color when designType value is disabled', () => {
    wrapper = shallow(<StyledButton designType="disabled" />);

    expect(wrapper).toHaveStyleRule('background', '#e1e1e1');
  });
});

describe('Border color', () => {
  it('should render StyledButton with correct border color when designType value is submitted', () => {
    wrapper = shallow(<StyledButton designType="submit" />);

    expect(wrapper).toHaveStyleRule('border-color', '#78c801');
  });

  it('should render StyledButton with correct border color when designType value is disabled', () => {
    wrapper = shallow(<StyledButton designType="disabled" />);

    expect(wrapper).toHaveStyleRule('border-color', '#e5e5e5');
  });
});

describe('Cursor', () => {
  it('should render StyledButton with correct cursor style when disabled is true', () => {
    wrapper = shallow(<StyledButton disabled />);

    expect(wrapper).toHaveStyleRule('cursor', 'default');
  });

  it('should render StyledButton with correct cursor style when disabled is false', () => {
    wrapper = shallow(<StyledButton disabled={false} />);

    expect(wrapper).toHaveStyleRule('cursor', 'pointer');
  });
});

it('should render StyledButton with correct pointer event when disabled is true', () => {
  wrapper = shallow(<StyledButton disabled="disabled" />);

  expect(wrapper).toHaveStyleRule('pointer-events', 'none');
});

it('should render StyledButton with correct focus styles when disabled value is true', () => {
  wrapper = shallow(<StyledButton disabled />);

  expect(wrapper).not.toHaveStyleRule('background', {
    modifier,
  });
  expect(wrapper).not.toHaveStyleRule('letter-spacing', {
    modifier,
  });
  expect(wrapper).not.toHaveStyleRule('box-shadow', {
    modifier,
  });
  expect(wrapper).not.toHaveStyleRule('transition', {
    modifier,
  });
});
