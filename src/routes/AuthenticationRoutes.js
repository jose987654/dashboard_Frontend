import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const Login = Loadable(lazy(() => import('../views/pages/authentication/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/pages/authentication/authentication/Register')));
const PasswordReset = Loadable(lazy(() => import('../views/pages/authentication/authentication/Reset')));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Login />
    },
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
    },
    {
      path: '/reset_password',
      element: <PasswordReset />
    }
  ]
};

export default AuthenticationRoutes;
