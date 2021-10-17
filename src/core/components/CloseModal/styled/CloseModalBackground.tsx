import styled from 'styled-components';
import colors from '../../../constants/colors';

const CloseModalBackground = styled.div`
  width: 100%;
  height: 100%;
  margin: -10px;
  background: ${colors.CloseModalBackground_background};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export default CloseModalBackground;
