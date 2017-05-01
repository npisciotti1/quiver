'use strict';

require('./_login.scss');

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', 'venueService', 'gearService', LoginController],
  controllerAs: 'loginCtrl'
};

function LoginController($log, $location, authService, venueService, gearService) {
  $log.debug('LoginController');

  authService.getToken();

  this.login = function() {
    $log.log('loginCtrl.login()');

    authService.login(this.user)
    .then( () => venueService.fetchOneVenueLogin())
    .then( () => gearService.fetchGear(venueService.currentVenue._id))
    .then( () => {
      $location.url('/dashboard');
    });
  };
}
