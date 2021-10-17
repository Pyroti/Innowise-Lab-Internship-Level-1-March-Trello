import styled from 'styled-components';
import colors from '../../../constants/colors';

const CloseModalWrapper = styled.div`
  width: 500px;
  height: 400px;
  box-shadow: 0 5px 16px ${colors.form_shadow};
  background: ${colors.CloseModalWrapper_background};
  color: ${colors.CloseModalWrapper_color};
  display: grid;
  position: relative;
  z-index: 100;
  border-radius: 10px;
  padding: 24px;
  @media (max-width: 768px) {
    width: 400px;
    height: 350px;
  }
  @media (max-width: 400px) {
    width: 310px;
    height: 350px;
  }
`;

export default CloseModalWrapper;
