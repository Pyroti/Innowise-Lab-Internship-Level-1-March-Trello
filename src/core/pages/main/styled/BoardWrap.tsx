import styled from 'styled-components';
import colors from '../../../constants/colors';

const BoardWrap = styled.div`
  display: flex;
  position: relative;
  justify-items: center;
  height: 100%;
  min-height: 88vh;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: 2px ${colors.form_main_color} solid;
`;

export default BoardWrap;
