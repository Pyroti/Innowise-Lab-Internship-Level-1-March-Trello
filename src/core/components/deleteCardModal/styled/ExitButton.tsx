import styled from 'styled-components';
import colors from '../../../constants/colors';

const ExitButton = styled.button`
  width: 190px;
  height: 40px;
  border-radius: 10px;
  margin-top: 40px;
  background-color: ${colors.formMainColor};
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${colors.formDefaultColor};
  &:hover {
    background-color: ${colors.formMainFocusColor};
  }
`;

export default ExitButton;
