import { IconWindmill, IconMail, IconAd, IconSearch } from '@tabler/icons';

const icons = {
  // IconTypography,
  // IconPalette,
  // IconShadow,
  IconWindmill,
  IconMail,
  IconAd,
  IconSearch
};

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-color',
      title: 'Search Console API',
      type: 'item',
      url: '/dashboard/search_api',
      icon: icons.IconSearch,
      breadcrumbs: false
    },
    {
      id: 'util-typography',
      title: 'Ads. Campaign API',
      type: 'item',
      url: '/dashboard/ads_api',
      icon: icons.IconAd,
      breadcrumbs: false
    },
    {
      id: 'util-typography-planner',
      title: 'Keyword Planner API',
      type: 'item',
      url: '/dashboard/keywords',
      icon: icons.IconAd,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Email',
      type: 'item',
      url: '/dashboard/email',
      icon: icons.IconMail,
      breadcrumbs: false
    }
  ]
};

export default utilities;
