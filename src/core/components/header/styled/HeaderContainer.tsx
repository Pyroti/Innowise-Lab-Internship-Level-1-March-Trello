import styled from 'styled-components';
import Colors from '../../../constants/colors';
import mediaQueries from '../../../constants/mediaQueries';
import HeaderContentContainer from './HeaderContentContainer';

const HeaderStyled = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background: ${Colors.headerStyledBackground};
  color: ${Colors.headerStyledColor};
  flex-wrap: wrap;

  ${HeaderContentContainer} {
    width: 250px;
  }

  @media ${mediaQueries.mediaTabletSmall} {
    ${HeaderContentContainer} {
      width: auto;
    }
  }
`;

export default HeaderStyled;
