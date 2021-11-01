import styled from 'styled-components';
import Colors from '../../constants/colors';

const CancelButton = styled.button`
  width: 190px;
  height: 40px;
  border-radius: 10px;
  background-color: ${Colors.withoutColor};
  cursor: pointer;
  outline: none;
  border: 2px ${Colors.formMainColor} solid;
  color: ${Colors.formMainColor};
  &:hover {
    border: 2px ${Colors.formMainFocusColor} solid;
    color: ${Colors.formMainFocusColor};
  }
`;

export default CancelButton;
