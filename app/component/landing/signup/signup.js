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
      name: 'new user',
      address: 'place'
    };

    authService.signup(user)
    .then( response => {
      $location.url('/dashboard');

      tempVenue.userID = response.userID;
      venueService.createVenue(tempVenue);
      console.log(tempVenue);
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
