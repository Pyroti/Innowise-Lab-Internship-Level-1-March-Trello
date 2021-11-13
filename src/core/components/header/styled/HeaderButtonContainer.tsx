import styled from 'styled-components';
import Colors from '../../../constants/colors';

const HeaderButtonStyled = styled.button`
  background: ${Colors.withoutColor};
  color: ${Colors.headerButtonStyledColor};
  cursor: pointer;
  outline: none;
  border: none;
  transform: scale(1.4);
`;

export default HeaderButtonStyled;
