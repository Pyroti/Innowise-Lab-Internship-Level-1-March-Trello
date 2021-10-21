import firebase from 'firebase/compat/app';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppWrapper from './core/components/styled/AppWrapper';
import MainRoutes from './core/constants/MainRouters';
import { auth } from './core/firebase/firebase';
import Login from './core/pages/auth/login/Login';
import Register from './core/pages/auth/register/Register';
import Main from './core/pages/main/Main';
import setUserInitiate from './core/redux/action-creators/auth/setUserAction';
import PrivateRoute from './privateRouter';

console.log('Hello World');

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser: firebase.User | null) => {
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
    </AppWrapper>
  );
};

export default App;
