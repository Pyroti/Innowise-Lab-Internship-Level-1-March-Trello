import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainRoutes from './core/constants/MainRouters';
import { auth } from './core/firebase/firebase';
import Main from './core/pages/main/Main';
import Login from './core/pages/start/Login';
import Register from './core/pages/start/Register';
import { setUser } from './core/redux/action-creators/setUserAction';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={MainRoutes.main} component={Main} />
        <Route path={MainRoutes.login} component={Login} />
        <Route path={MainRoutes.register} component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
