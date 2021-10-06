import styled from 'styled-components';
import colors from '../../../../constants/colors';

const SingUpButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  background-color: ${colors.without_color};
  cursor: pointer;
  outline: none;
  border: 2px ${colors.form_main_color} solid;
  color: ${colors.form_main_color};
  &:hover {
    border: 2px ${colors.form_main_focus_color} solid;
    color: ${colors.form_main_focus_color};
  }
`;

export default SingUpButton;
