import styled from 'styled-components';
import Colors from '../../../../core/constants/colors';
import MediaQueries from '../../../../core/constants/mediaQueries';

const BoardStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 290px;
  min-width: 290px;
  height: 100%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 2px ${Colors.formMainColor} solid;

  @media ${MediaQueries.mediaMobile} {
    && {
      min-width: 260px;
    }
  }
`;

export default BoardStyled;
