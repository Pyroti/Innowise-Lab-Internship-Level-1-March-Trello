import styled from 'styled-components';
import Colors from '../../../../constants/colors';

const AddBoardButton = styled.button`
  width: 200px;
  height: 100%;
  border-radius: 10px;
  background-color: ${Colors.withoutColor};
  cursor: pointer;
  outline: none;
  color: ${Colors.addBoardButtonColor};
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  border: 2px ${Colors.formMainColor} solid;
  &:before {
    content: '+';
    margin-right: 10px;
  }
`;

export default AddBoardButton;
