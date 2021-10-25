import styled from 'styled-components';
import Colors from '../../../../constants/colors';

const SingUpButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  background-color: ${Colors.formMainColor};
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${Colors.formDefaultColor};
  &:hover {
    background-color: ${Colors.formMainFocusColor};
  }
`;

export default SingUpButton;
