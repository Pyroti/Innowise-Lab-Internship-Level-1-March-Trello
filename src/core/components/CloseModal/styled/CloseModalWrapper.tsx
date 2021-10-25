import styled from 'styled-components';
import Colors from '../../../constants/colors';
import mediaQueries from '../../../constants/mediaQueries';

const CloseModalWrapper = styled.div`
  width: 500px;
  height: 400px;
  box-shadow: 0 5px 16px ${Colors.formShadow};
  background: ${Colors.closeModalWrapperBackground};
  color: ${Colors.closeModalWrapperColor};
  display: grid;
  position: relative;
  z-index: 100;
  border-radius: 10px;
  padding: 24px;
  @media (${mediaQueries.mediaTablet}) {
    width: 400px;
    height: 350px;
  }
  @media (${mediaQueries.mediaMobile}) {
    width: 310px;
    height: 350px;
  }
`;

export default CloseModalWrapper;
