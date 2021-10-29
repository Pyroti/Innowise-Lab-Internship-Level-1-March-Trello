import styled from 'styled-components';
import Colors from '../../../constants/colors';
import mediaQueries from '../../../constants/mediaQueries';
import HeaderContentWidth from './HeaderContentWidth';

const HeaderStyled = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background: ${Colors.headerStyledBackground};
  color: ${Colors.headerStyledColor};
  flex-wrap: wrap;

  ${HeaderContentWidth}:nth-child(2n + 1) {
    width: 250px;
  }

  @media ${mediaQueries.mediaLaptop} {
    ${HeaderContentWidth}:nth-child(2) {
      display: none;
    }
  }

  @media ${mediaQueries.mediaTabletSmall} {
    ${HeaderContentWidth}:nth-child(2) {
      display: none;
    }

    ${HeaderContentWidth}:nth-child(2n + 1) {
      width: auto;
    }
  }
`;

export default HeaderStyled;
