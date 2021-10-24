import styled from 'styled-components';
import colors from '../../../../constants/colors';

const BoardStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 290px;
  height: 100%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px ${colors.form_main_color} solid;
`;

export default BoardStyled;
