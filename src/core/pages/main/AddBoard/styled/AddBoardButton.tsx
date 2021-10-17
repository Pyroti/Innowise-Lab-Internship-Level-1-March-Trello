import styled from 'styled-components';
import colors from '../../../../constants/colors';

const AddBoardButton = styled.button`
  width: 200px;
  height: 100%;
  border-radius: 10px;
  background-color: ${colors.without_color};
  cursor: pointer;
  outline: none;
  color: #1967ff;
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  border: 2px ${colors.form_main_color} solid;
  &:before {
    content: '+';
    margin-right: 10px;
  }
`;

export default AddBoardButton;
