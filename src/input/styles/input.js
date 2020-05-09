import styled from 'styled-components';

const getBorderColor = ({ hasErrorMessage }) => (
  hasErrorMessage
    ? '#eb2b2b'
    : '#e5e5e5'
);

const getBackgroundColor = ({ hasErrorMessage }) => (
  hasErrorMessage
    ? '#ffc2c1'
    : '#ffffff'
);

const getFocusBackground = ({ hasErrorMessage }) => (
  hasErrorMessage
    ? '#ffc2c1'
    : '#ddf4ff'
);

const getFocusBorderColor = ({ hasErrorMessage }) => (
  hasErrorMessage
    ? '#eb2b2b'
    : '#1cb0f6'
);

export default styled.input`
  background: ${getBackgroundColor};
  border: 2px solid ${getBorderColor};
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  height: 45px;
  outline: none;
  padding-left: 10px;
  width: 100%;
  
  :focus {
    background: ${getFocusBackground};
    border: 2px solid ${getFocusBorderColor};
    outline: none;
  }

  ::placeholder {
    font-size: 16px;
    color: #3c3c3c;
  }
`;









