import styled from 'styled-components';
import Colors from '../../../constants/colors';

const CloseModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${Colors.closeModalBackgroundBackground};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export default CloseModalBackground;
