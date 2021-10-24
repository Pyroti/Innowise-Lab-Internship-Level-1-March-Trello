import styled from 'styled-components';
import mediaQueries from '../../../constants/mediaQueries';

const HeaderContentWidth = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;

  @media (${mediaQueries.mediaMobile}) {
    width: 150px;
  }
`;

export default HeaderContentWidth;
