import styled from 'styled-components';
import colors from '../../../constants/colors';
import HeaderContentWidth from './HeaderContentWidth';

const HeaderStyled = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: ${colors.HeaderStyled_background};
  color: ${colors.HeaderStyled_color};
  flex-wrap: wrap;

  @media (max-width: 622px) {
    ${HeaderContentWidth}:nth-child(2) {
      display: none;
    }
  }
`;

export default HeaderStyled;
