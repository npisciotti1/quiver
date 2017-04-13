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
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
