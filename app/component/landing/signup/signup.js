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

  // var tempPhoneNumber = `${Math.floor(Math.random() * 999999999)}`;
  // function formatPhoneNumber(s) {
  //   var s2 = (""+s).replace(/\D/g, '');
  //   var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  //   return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  // }

  let tempVenue = {
    name: `venue no. ${Math.floor(Math.random() * 1000000)}`,
    address: `${Math.floor(Math.random() * 1000000)}, main st.`,
    phone: '1 (123) 456-7890',
    hours: '8:00am - 10:00pm'
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
          description: '(6) Chauvet R1-Beam Moving Head'
        },
        {
          name: 'FX',
          description: '(1) Martin Atomic Strobe'
        }
      ],
      stage: [
        {
          name: 'Width',
          description: '32 feet'
        },
        {
          name: 'Depth',
          description: '16.5 feet'
        },
        {
          name: 'Height',
          description: '3.5 feet'
        },
        {
          name: 'Light-Clearance',
          description: '9.5 feet to the lights'
        },
        {
          name: 'Truss-Clearance',
          description: '11 feet to truss'
        },
        {
          name: 'Fog Machine',
          description: '(3) The coolest thing we have'
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
