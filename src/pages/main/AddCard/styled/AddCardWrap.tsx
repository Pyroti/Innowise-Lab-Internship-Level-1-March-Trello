import styled from 'styled-components';
import Colors from '../../../../core/constants/colors';

const AddCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 265px;
  min-width: 265px;
  height: 110px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px ${Colors.formMainColor} solid;
`;

export default AddCardWrap;
