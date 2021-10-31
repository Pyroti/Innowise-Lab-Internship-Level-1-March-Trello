import styled from 'styled-components';
import Colors from '../../constants/colors';
import mediaQueries from '../../constants/mediaQueries';

const AuthForm = styled.form`
  position: relative;
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Colors.formBackground};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 4px 4px 8px 0px ${Colors.formShadow};
  color: ${Colors.formMainColor};
  @media ${mediaQueries.mediaTablet} {
    width: 350px;
    height: 450px;
  }
  @media ${mediaQueries.mediaMobile} {
    width: 300px;
    height: 400px;
  }
`;

export default AuthForm;
