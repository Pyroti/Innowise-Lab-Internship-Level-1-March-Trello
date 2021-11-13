import styled from 'styled-components';
import mediaQueries from '../../../constants/mediaQueries';

const HeaderWelcome = styled.h2`
  padding: 15px 60px;
  display: flex;
  justify-content: center;

  @media ${mediaQueries.mediaLaptop} {
    display: none;
  }
`;

export default HeaderWelcome;
