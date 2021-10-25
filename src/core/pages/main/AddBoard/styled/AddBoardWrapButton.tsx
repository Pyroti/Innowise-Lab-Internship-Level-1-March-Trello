import styled from 'styled-components';
import Colors from '../../../../constants/colors';

const AddBoardWrapButton = styled.button`
  width: 140px;
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

export default AddBoardWrapButton;
