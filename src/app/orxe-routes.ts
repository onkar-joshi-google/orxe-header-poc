import { MicroAppRouteConfig } from 'shell-sdk';

export const microAppRoutes: MicroAppRouteConfig[] = [
  {
    path: '/search',
    children: [
      {
        path: 'hotel',
        tagName: 'app-hotel-search'
      },
      {
        path: 'hotel',
        tagName: 'app-hotel-deals',
        outlet: 'relevant-content'
      },
      {
        path: 'flight',
        tagName: 'app-flight-search'
      },
      {
        path: 'flight',
        tagName: 'app-flight-deals',
        outlet: 'relevant-content'
      },
      {
        path: 'cruise',
        tagName: 'app-cruise-search'
      }
    ]
  },
  {
    path: '/results',
    children: [
      {
        path: 'hotel',
        tagName: 'app-hotel-results'
      },
      {
        path: 'flight',
        tagName: 'app-flight-results'
      },
      {
        path: 'cruise',
        tagName: 'app-cruise-results'
      }
    ]
  },
  {
    path: '/details',
    children: [
      {
        path: 'hotel',
        tagName: 'app-hotel-details'
      },
      {
        path: 'flight',
        tagName: 'app-flight-details'
      },
      {
        path: 'cruise',
        tagName: 'app-cruise-details'
      }
    ]
  }
];
