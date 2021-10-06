import styled from 'styled-components';
import colors from '../../../../constants/colors';

const SingUpButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  background-color: ${colors.form_main_color};
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${colors.form_default_color};
  &:hover {
    background-color: ${colors.form_main_focus_color};
  }
`;

export default SingUpButton;
