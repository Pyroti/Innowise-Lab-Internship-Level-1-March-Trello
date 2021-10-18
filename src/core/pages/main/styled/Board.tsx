import styled from 'styled-components';
import colors from '../../../constants/colors';

const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 325px;
  height: 100%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px ${colors.form_main_color} solid;
`;

export default Board;
