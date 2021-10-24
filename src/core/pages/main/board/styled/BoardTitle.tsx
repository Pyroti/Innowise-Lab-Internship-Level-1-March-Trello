import styled from 'styled-components';
import colors from '../../../../constants/colors';

const BoardTitle = styled.div`
  height: 100%;
  background-color: ${colors.without_color};
  color: ${colors.defaultBlackColor};
  font-size: 16px;
  padding: 10px;
  margin: -12px;
  margin-bottom: 10px;
  border-bottom: 2px ${colors.form_main_color} solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export default BoardTitle;
