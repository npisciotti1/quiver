'use strict';

require('./_display-gear.scss');

module.exports = {
  template: require('./display-gear.html'),
  controller: ['$log', 'venueService', 'gearService', DisplayGearController],
  controllerAs: 'displayGearCtrl',
  bindings: {
    venue: '<'
  }
};

function DisplayGearController($log, venueService, gearService) {
  $log.debug('DisplayGearController');

  this.gear = {};


  this.displayGear = function() {
    $log.debug('DisplayGearController.createGear()');

    gearService.displayGear(this.venue._id, this.gear)
    .then( () => {
      this.gear = {};
    });
  };
}
