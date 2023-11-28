import { lazy } from 'react';
import MainLayout from '../layout/MainLayout/index.js';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const AdsComponent = Loadable(lazy(() => import('../views/utilities/Typography')));
const EmailComponent = Loadable(lazy(() => import('../views/utilities/Email')));
const ShadowComponent = Loadable(lazy(() => import('../views/utilities/Shadow')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'ads_api',
          element: <AdsComponent />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'search_api',
          element: <ShadowComponent />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'email',
          element: <EmailComponent />
        }
      ]
    },

    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
