'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', 'venueService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService, venueService) {
  $log.debug('SignupController');
  authService.getToken()
  .then( () => {
    $location.url('/dashboard');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');

    let tempVenue = {
      name: `venue no. ${Math.floor(Math.random() * 1000000)}`,
      address: `${Math.floor(Math.random() * 1000000)}, main st.`
    };

    authService.signup(user)
    .then( () => {
      $location.url('/dashboard');

      venueService.createVenue(tempVenue);
    });
  }


  // this.venueCheck = function() {
  //   $log.debug('signupCtrl.venueCheck()');
  //
  //   if(this.venueCheckbox) {
  //     this.user.isVenue = true;
  //     // TODO: Add functionality for artist
  //     return;
  //   }
  //
  //   this.user.isVenue = false;
  //   // TODO: Add functionality for artist
  //
  //   return;
  // }
}
