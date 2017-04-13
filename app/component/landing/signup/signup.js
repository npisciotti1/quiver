'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService) {
  $log.debug('SignupController');
  authService.getToken()
  .then( () => {
    $location.url('.home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  }

  this.venueCheck = function() {
    $log.debug('signupCtrl.venueCheck()');

    if(this.venueCheckbox) {
      this.user.isVenue = true;
      // TODO: Add functionality for artist
      return;
    }

    this.user.isVenue = false;
    // TODO: Add functionality for artist

    return;
  }
}
