import styled from 'styled-components';

const HeaderContentWidth = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;

  @media (max-width: 420px) {
    width: 150px;
  }
`;

export default HeaderContentWidth;
