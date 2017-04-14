'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routeConfig];

//TODO: add more routes as we build our app:
function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('' , '/join#signup');
  $urlRouterProvider.when('/' , '/join#signup');
  $urlRouterProvider.when('/signup' , '/join#signup');
  $urlRouterProvider.when('/login' , '/join#login');

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
    },
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
