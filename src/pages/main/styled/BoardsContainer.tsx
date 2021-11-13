import styled from 'styled-components';
import colors from '../../../core/constants/colors';

const BoardsContainer = styled.div`
  display: flex;
  position: relative;
  justify-items: center;
  height: 100%;
  min-height: 88vh;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  overflow-x: auto;
  border: 2px ${colors.formMainColor} solid;
`;

export default BoardsContainer;
