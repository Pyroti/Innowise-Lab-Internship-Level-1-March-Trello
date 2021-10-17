import styled, { keyframes } from 'styled-components';
import colors from '../../constants/colors';

const spin = keyframes`
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 120px;
  height: 120px;
  margin: -76px 0 0 -76px;
  border: 16px solid ${colors.loaderBorder};
  border-radius: 50%;
  border-top: 16px solid ${colors.loaderBorderTop};
  -webkit-animation: ${spin} 2s linear infinite;
  animation: ${spin} 2s linear infinite;
`;

export default Loader;
