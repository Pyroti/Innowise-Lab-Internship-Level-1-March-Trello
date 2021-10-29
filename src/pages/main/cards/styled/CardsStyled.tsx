import styled from 'styled-components';
import Colors from '../../../../core/constants/colors';
import mediaQueries from '../../../../core/constants/mediaQueries';

const CardStyled = styled.div`
  width: 250px;
  height: 100%;
  border-radius: 10px;
  background-color: ${Colors.withoutColor};
  cursor: pointer;
  color: ${Colors.defaultBlackColor};
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  border: 2px ${Colors.formMainColor} solid;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${mediaQueries.mediaMobile} {
    && {
      width: 230px;
    }
  }
`;

export default CardStyled;
