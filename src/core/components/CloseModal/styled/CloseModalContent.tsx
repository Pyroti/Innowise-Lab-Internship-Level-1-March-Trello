import styled from 'styled-components';
import color from '../../../constants/colors';

const CloseModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  line-height: 1.8;
  height: 100%;
  color: ${color.CloseModalContent_color};
`;

export default CloseModalContent;
