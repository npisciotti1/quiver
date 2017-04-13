'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routeConfig];

//TODO: add more routes as we build our app:
function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/', '/home');

  let states = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
