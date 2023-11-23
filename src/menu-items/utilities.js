// assets
import { IconWindmill, IconMail, IconAd, IconSearch } from '@tabler/icons';

// constant
const icons = {
  // IconTypography,
  // IconPalette,
  // IconShadow,
  IconWindmill,
  IconMail,
  IconAd,
  IconSearch
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

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
      id: 'util-shadow',
      title: 'Email',
      type: 'item',
      url: '/dashboard/email',
      icon: icons.IconMail,
      breadcrumbs: false
    }
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default utilities;
