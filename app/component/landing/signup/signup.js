'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$q', '$window', '$location', 'authService', 'venueService', 'gearService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $q, $window, $location, authService, venueService, gearService) {
  $log.debug('SignupController');
  authService.getToken()
  .then( () => {
    $location.url('/dashboard');
  });

  let tempVenue = {
    name: `venue no. ${Math.floor(Math.random() * 1000000)}`,
    address: `${Math.floor(Math.random() * 1000000)}, main st.`
  };
  
  let tempGear = {
    gear: {
      audio: [
        {
          name: 'example instrument',
          description: 'so cool instrument'
        },
      ],
      lighting: [
        {
          name: 'sweet light',
          description: 'this is bright'
        }
      ],
      stage: [
        {
          name: 'width',
          description: 'example width'
        },
        {
          name: 'height',
          description: 'example height'
        }
      ]
    }
  };

  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');


    authService.signup(user)
    .then( () => {
      $location.url('/dashboard');

      return $q.resolve(venueService.createVenue(tempVenue));
    })
    .then( venueData => {
      gearService.postGear(venueData._id, tempGear);
    });
  };


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
