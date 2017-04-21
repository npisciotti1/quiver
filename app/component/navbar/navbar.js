'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navBarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.checkPath = function() {
    let path = $location.path();
    if(path === '/join') {
      this.hideButtons = true;
    }

    if( path !== '/join') {
      this.hideButtons = false;
      authService.getToken()
      .catch( () => {
        $location.url('/join#signup');
      });
    }
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.debug('navBarCtrl.logout');

    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };

  this.routes = [
    {
      name: 'dashboard',
      url: '/#!/dashboard'
    },
    {
      name: 'venues',
      url: '/#!/venues',
    },
    {
      name: 'search',
      url: '/#!/search',
    },
    {
      name: 'about',
      url: '/#!/about'
    }
  ];
}
