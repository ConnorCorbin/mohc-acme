import styled, { css } from 'styled-components';

const getBackgroundColor = ({ designType }) => {
  const backgroundColorMap = {
    disabled: '#e1e1e1',
    submit: '#b8f28b',
  };

  return backgroundColorMap[designType];
};

const getBorderColor = ({ designType }) => {
  const bordereColorMap = {
    disabled: '#e5e5e5',
    submit: '#78c801',
  };

  return bordereColorMap[designType];
};

const getHoverStyles = ({ disabled }) => disabled && `
  :hover {
    background: #78c801;
    letter-spacing: 1px;
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
  }
`;

const getPointerEvents = ({ disabled }) => disabled && `
  pointer-events: none;
`;

const getCursor = ({ disabled }) => (
  disabled
    ? 'default'
    : 'pointer'
);

const baseStyles = css`
  color: black;
  cursor: ${getCursor};
  background: ${getBackgroundColor};
  border-color: ${getBorderColor};
  border-radius: 5px;
  padding: 20px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.4s ease 0s;
`;

export default styled.button`
  ${baseStyles}
  ${getHoverStyles}
  ${getPointerEvents}
`;
