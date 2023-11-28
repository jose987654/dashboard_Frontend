import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const Login = Loadable(lazy(() => import('../views/pages/authentication/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/pages/authentication/authentication/Register')));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/*',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]
};

export default AuthenticationRoutes;
