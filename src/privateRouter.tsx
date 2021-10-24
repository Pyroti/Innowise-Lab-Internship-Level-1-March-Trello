import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import MainRoutes from './core/constants/MainRouters';
import { useTypedSelector } from './core/hooks/useTypeSelector';
import authSelector from './core/redux/selectors/authSelector';

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const { component: Component, ...rest } = props;

  const { currentUser } = useTypedSelector(authSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser === null ? (
          <Redirect to={MainRoutes.login} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
