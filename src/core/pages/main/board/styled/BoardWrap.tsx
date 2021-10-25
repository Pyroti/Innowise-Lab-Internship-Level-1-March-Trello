import styled from 'styled-components';
import Colors from '../../../../constants/colors';

const BoardWrap = styled.div`
  display: flex;
  position: relative;
  justify-items: center;
  height: 100%;
  min-height: 88vh;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: 2px ${Colors.formMainColor} solid;
`;

export default BoardWrap;
