import firebase from 'firebase/compat/app';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContainer from './core/components/AppContainer/AppContainer';
import MainRoutes from './core/constants/MainRouters';
import { auth } from './core/firebase/firebase';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Main from './pages/main/Main';
import setUserInitiate from './core/redux/action-creators/auth/setUserAction';
import PrivateRoute from './privateRouter';
import { ToastContainer } from 'react-toastify';
import dotenv from 'dotenv';

dotenv.config();

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser: firebase.User) => {
      if (authUser) {
        dispatch(setUserInitiate(authUser));
      } else {
        dispatch(setUserInitiate(null));
      }
    });
  }, [dispatch]);

  return (
    <AppContainer>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <PrivateRoute exact path={MainRoutes.main} component={Main} />
          <Route path={MainRoutes.login} component={Login} />
          <Route path={MainRoutes.register} component={Register} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </AppContainer>
  );
};

export default App;
