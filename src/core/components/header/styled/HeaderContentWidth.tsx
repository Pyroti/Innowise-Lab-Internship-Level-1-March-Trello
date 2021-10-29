import styled from 'styled-components';
import mediaQueries from '../../../constants/mediaQueries';

const HeaderContentWidth = styled.div`
  padding: 15px 60px;
  display: flex;
  justify-content: center;

  @media ${mediaQueries.mediaTabletSmall} {
    width: none;
    padding: 15px 30px;
  }
`;

export default HeaderContentWidth;
