import { lazy } from 'react';
import MainLayout from '../layout/MainLayout/index.js';
import Loadable from '../ui-component/Loadable';
import { PrivateRoutes } from '../services/user.js';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const AdsComponent = Loadable(lazy(() => import('../views/utilities/Ads_data')));
const EmailComponent = Loadable(lazy(() => import('../views/utilities/Email')));
const SearchComponent = Loadable(lazy(() => import('../views/utilities/SearchConsole')));
const WordsComponent = Loadable(lazy(() => import('../views/utilities/Keyword_planner')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <PrivateRoutes>
          <DashboardDefault />
        </PrivateRoutes>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <PrivateRoutes>
              <DashboardDefault />
            </PrivateRoutes>
          )
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'ads_api',
          element: (
            <PrivateRoutes>
              <AdsComponent />
            </PrivateRoutes>
          )
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'keywords',
          element: (
            <PrivateRoutes>
              <WordsComponent />
            </PrivateRoutes>
          )
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'search_api',
          element: (
            <PrivateRoutes>
              <SearchComponent />
            </PrivateRoutes>
          )
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'email',
          element: (
            <PrivateRoutes>
              <EmailComponent />
            </PrivateRoutes>
          )
        }
      ]
    },

    {
      path: 'sample-page',
      element: (
        <PrivateRoutes>
          <SamplePage />
        </PrivateRoutes>
      )
    }
  ]
};

export default MainRoutes;
