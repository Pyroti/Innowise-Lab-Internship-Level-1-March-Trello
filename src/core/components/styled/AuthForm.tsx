import styled from 'styled-components';
import colors from '../../constants/colors';
import mediaQueries from '../../constants/mediaQueries';

const AuthForm = styled.form`
  position: relative;
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${colors.form_background};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 4px 4px 8px 0px ${colors.form_shadow};
  color: ${colors.form_main_color};
  @media (${mediaQueries.mediaTablet}) {
    width: 350px;
    height: 450px;
  }
`;

export default AuthForm;
