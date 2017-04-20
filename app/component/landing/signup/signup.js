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
          name: 'FOH Console',
          description: 'Venue SC48 Digital Protools console'
        },
        {
          name: 'FOH Speakers',
          description: '(10) JBL VTX V20 – LINE ARRAYED'
        },
        {
          name: 'FOH Speakers',
          description: '(4) JBL AC28 Fills'
        },
        {
          name: '5-Piece Kit',
          description: 'Pearl - Session Studio Classic'
        },
        {
          name: 'Deluxe Strat',
          description: 'Play like Jimi!'
        },
        {
          name: 'Mics',
          description: '(2) Shure Beta 91A'
        },
        {
          name: 'Mics',
          description: '(2) Shure Beta 52A'
        },
      ],
      lighting: [
        {
          name: 'Controller Board',
          description: 'Avolites Quartz'
        },
        {
          name: 'LED Cans',
          description: '(18) Chauvet Par-Quad 18 LEDs'
        },
        {
          name: 'LED Cans',
          description: '(6) Chauvet NXT-1 Moving Head LED Panel'
        },
        {
          name: 'FX',
          description: '(1) Martin-Rush MH3 Beam'
        },
        {
          name: 'FX',
          description: '(1) Martin Atomic Strobe'
        }
      ],
      stage: [
        {
          name: 'width',
          description: '32 feet'
        },
        {
          name: 'depth',
          description: '16.5 feet'
        },
        {
          name: 'height',
          description: '3.5 feet'
        },
        {
          name: 'Clearance',
          description: '9.5 feet to the lights'
        }
      ]
    }
  };

  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');


    authService.signup(user)
    .then( () => {

      return $q.resolve(venueService.createVenue(tempVenue));
    })
    .then( venueData => {
      return $q.resolve(gearService.postGear(venueData._id, tempGear));
    })
    .then(userGear => {
      $location.url('/dashboard');
    });
  };
}
