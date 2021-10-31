import firebase from 'firebase/compat/app';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppWrapper from './core/components/appWrapper/AppWrapper';
import MainRoutes from './core/constants/MainRouters';
import { auth } from './core/firebase/firebase';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Main from './pages/main/Main';
import setUserInitiate from './core/redux/action-creators/auth/setUserAction';
import PrivateRoute from './privateRouter';
import { ToastContainer } from 'react-toastify';

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
    <AppWrapper>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path={MainRoutes.main} component={Main} />
          <Route path={MainRoutes.login} component={Login} />
          <Route path={MainRoutes.register} component={Register} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </AppWrapper>
  );
};

export default App;
