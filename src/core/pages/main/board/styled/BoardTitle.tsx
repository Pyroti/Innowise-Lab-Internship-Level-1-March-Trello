import styled from 'styled-components';
import Colors from '../../../../constants/colors';

const BoardTitle = styled.div`
  height: 100%;
  background-color: ${Colors.withoutColor};
  color: ${Colors.defaultBlackColor};
  font-size: 16px;
  padding: 10px;
  margin: -12px;
  margin-bottom: 10px;
  border-bottom: 2px ${Colors.formMainColor} solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
`;

export default BoardTitle;
