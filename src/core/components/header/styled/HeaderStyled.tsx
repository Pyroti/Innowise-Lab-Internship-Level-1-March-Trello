import styled from 'styled-components';
import Colors from '../../../constants/colors';
import mediaQueries from '../../../constants/mediaQueries';
import HeaderContentWidth from './HeaderContentWidth';

const HeaderStyled = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: ${Colors.headerStyledBackground};
  color: ${Colors.headerStyledColor};
  flex-wrap: wrap;

  @media (${mediaQueries.mediaTablet}) {
    ${HeaderContentWidth}:nth-child(2) {
      display: none;
    }
  }
`;

export default HeaderStyled;
