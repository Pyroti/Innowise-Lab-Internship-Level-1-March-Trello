import styled from 'styled-components';
import colors from '../../../constants/colors';

const ExitButton = styled.button`
  width: 190px;
  height: 40px;
  border-radius: 10px;
  margin-top: 40px;
  background-color: ${colors.form_main_color};
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${colors.form_default_color};
  &:hover {
    background-color: ${colors.form_main_focus_color};
  }
`;

export default ExitButton;
