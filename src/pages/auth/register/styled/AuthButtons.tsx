import styled from 'styled-components';
import mediaQueries from '../../../../core/constants/mediaQueries';

const AuthButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 40px;

  @media ${mediaQueries.mediaTablet} {
    width: 70%;
  }

  @media ${mediaQueries.mediaMobile} {
    width: 80%;
  }
`;

export default AuthButtons;
