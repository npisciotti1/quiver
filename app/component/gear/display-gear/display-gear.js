'use strict';

require('./_display-gear.scss');

module.exports = {
  template: require('./display-gear.html'),
  controller: ['$log', '$window', 'venueService', 'gearService', DisplayGearController],
  controllerAs: 'displayGearCtrl',
  bindings: {
    venue: '<'
  }
};

function DisplayGearController($log, $window, venueService, gearService) {
  $log.debug('DisplayGearController');

  this.gear = {};


  this.fetchGear = function() {
    $log.debug('DisplayGearController.fetchGear()');

    gearService.fetchGear($window.localStorage.currentVenue)
    .then( gear => {
      this.gear = gear;
      this.audioArray = Object.keys(Object.keys(gear)[0]);
      this.lightingArray = Object.keys(Object.keys(gear)[1]);
      this.stageArray = Object.keys(Object.keys(gear)[2]);
    });
  };

  this.arrayifyGear = function(obj) {
    if(!obj) return $log.error('didn\'t provide an object');

    let result = [];
  }

  this.fetchGear();
}