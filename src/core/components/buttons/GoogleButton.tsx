import styled from 'styled-components';
import Colors from '../../constants/colors';

const GoogleButton = styled.button`
  outline: none;
  border: 0;
  background: ${Colors.withoutColor};
  margin: 20px 0;
  &:hover {
    cursor: pointer;
  }
`;

export default GoogleButton;
