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

  this.audioArray = [];
  this.lightingArray = [];
  this.stageArray = [];

  this.fetchGear = function() {
    $log.debug('DisplayGearController.fetchGear()');

    gearService.fetchGear($window.localStorage.currentVenue)
    .then( gear => {
      this.gear = gear;
    });
  };

  this.arrayifyGear = function(obj) {
    if(!obj) return $log.error('didn\'t provide an object');

    let keys = .keys()
    let result = [];
  }

  this.fetchGear();
}
