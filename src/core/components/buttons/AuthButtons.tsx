import styled from 'styled-components';
import MediaQueries from '../../constants/mediaQueries';

const AuthButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 40px;

  @media ${MediaQueries.mediaTablet} {
    width: 70%;
  }

  @media ${MediaQueries.mediaMobile} {
    width: 80%;
  }
`;

export default AuthButtons;
