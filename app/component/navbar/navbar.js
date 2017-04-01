'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  //TODO: need to add auth service and more dependencies as we build it out
  controller: ['$log', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log) {
  $log.debug('NavbarController');

  //TODO: add logout bttn functionality
}
