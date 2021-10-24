import styled from 'styled-components';
import colors from '../../../../constants/colors';

const CardStyled = styled.div`
  width: 250px;
  height: 100%;
  border-radius: 10px;
  background-color: ${colors.without_color};
  cursor: pointer;
  color: ${colors.defaultBlackColor};
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  border: 2px ${colors.form_main_color} solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default CardStyled;
