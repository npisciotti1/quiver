'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routeConfig];

//TODO: add more routes as we build our app:
function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/dashboard');
  $urlRouterProvider.when('/', '/dashboard');

  let states = [
    {
      name: 'dashboard',
      url: '/dashboard',
      template: require('../view/dashboard/dashboard.html'),
      controller: 'DashboardController',
      controllerAs: 'dashboardCtrl'
    },
    {
      name: 'venue-search',
      url: '/venue-search',
      template: require('../view/venue-search/venue-search.html'),
      controller: 'VenueSearchController',
      controllerAs: 'venueSearchCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
