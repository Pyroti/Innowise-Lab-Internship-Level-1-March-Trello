import TextField from '@material-ui/core/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthContent from '../../../core/components/authContent/AuthContent';
import AuthForm from '../../../core/components/authForm/AuthForm';
import MainRoutes from '../../../core/constants/MainRouters';
import { useTypedSelector } from '../../../core/hooks/useTypeSelector';
import authSelector from '../../../core/redux/selectors/authSelector';
import AuthButtons from '../../../core/components/buttons/AuthButtons';
import GoogleButton from '../../../core/components/buttons/GoogleButton';
import SingInButton from '../../../core/components/buttons/SingInButton';
import SingUpButton from '../../../core/components/buttons/SingUpButton';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { googleSignInInitiate } from '../../../core/redux/thunk/auth/googleSignInInitiate';
import { loginInitiate } from '../../../core/redux/thunk/auth/loginInitiate';
import { validate } from './validate/validate';
import toastRyles from '../../../core/constants/toastRules';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { currentUser } = useTypedSelector(authSelector);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      const errors = validate(values);
      const errorsValues = Object.values(errors);
      const hasErrors = errorsValues.length > 0;
      if (!hasErrors) {
        dispatch(dispatch(loginInitiate(values.email, values.password)));
      } else {
        errorsValues.forEach((errorMessage) => {
          toast.warn(errorMessage, toastRyles as ToastOptions);
        });
      }
    }
  });

  useEffect(() => {
    if (currentUser) {
      history.push(MainRoutes.main);
    }
  }, [currentUser, history]);

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };

  return (
    <AuthContent>
      <AuthForm onSubmit={formik.handleSubmit}>
        <h1>{t('marchTrello')}</h1>

        <GoogleButton type="button" onClick={handleGoogleSignIn}>
          <GoogleIcon />
        </GoogleButton>

        <p>{t('or')}</p>

        <TextField
          id="email"
          label={t('enterYourMail')}
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          id="password"
          label={t('enterYourPassword')}
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <AuthButtons>
          <SingInButton type="submit">{t('logIn')}</SingInButton>
          <Link to={MainRoutes.register}>
            <SingUpButton type="button">{t('registration')}</SingUpButton>
          </Link>
        </AuthButtons>
      </AuthForm>
    </AuthContent>
  );
};

export default Login;
