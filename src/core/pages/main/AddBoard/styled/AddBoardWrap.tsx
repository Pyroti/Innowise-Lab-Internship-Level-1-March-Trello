import styled from 'styled-components';
import colors from '../../../../constants/colors';

const AddBoardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 300px;
  height: 110px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px ${colors.form_main_color} solid;
`;

export default AddBoardWrap;
